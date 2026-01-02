import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Plus, Save, X, Award, Trash2, Pencil, ExternalLink, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const CertificationManager = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [certs, setCerts] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    org: '',
    issueDate: '',
    expiryDate: '',
    imgUrl: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
    category: 'Web Development',
    isVisible: true,
    isFeatured: false
  });

  useEffect(() => {
    const q = query(collection(db, "certifications"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const certsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCerts(certsData);
      setFetching(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `certs/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        toast.error("Upload failed: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData(prev => ({ ...prev, imgUrl: downloadURL }));
          toast.success("Image uploaded!");
          setUploadProgress(0);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading(editId ? 'Updating...' : 'Adding...');
    try {
      const data = {
        ...formData,
        updatedAt: new Date(),
        order: editId ? certs.find(c => c.id === editId)?.order : certs.length
      };

      if (editId) {
        await updateDoc(doc(db, "certifications", editId), data);
        toast.success('Updated successfully!', { id: toastId });
      } else {
        await addDoc(collection(db, "certifications"), { ...data, createdAt: new Date() });
        toast.success('Added successfully!', { id: toastId });
      }

      resetForm();
    } catch {
      toast.error('Operation failed', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditId(null);
    setFormData({
      title: '', org: '', issueDate: '', expiryDate: '', imgUrl: '',
      credentialId: '', credentialUrl: '', description: '',
      category: 'Web Development', isVisible: true, isFeatured: false
    });
  };

  const handleEdit = (cert) => {
    setEditId(cert.id);
    setFormData({ ...cert });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await deleteDoc(doc(db, "certifications", id));
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const moveOrder = async (index, direction) => {
    const newCerts = [...certs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCerts.length) return;

    const currentCert = newCerts[index];
    const targetCert = newCerts[targetIndex];

    await updateDoc(doc(db, "certifications", currentCert.id), { order: targetCert.order });
    await updateDoc(doc(db, "certifications", targetCert.id), { order: currentCert.order });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Award className="text-primary"/> Certifications
        </h2>
        <button 
          onClick={() => isAdding ? resetForm() : setIsAdding(true)}
          className="cosmic-button flex items-center gap-2"
        >
          {isAdding ? <><X size={20}/> Cancel</> : <><Plus size={20}/> Add New</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-card p-6 rounded-xl border border-border space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input name="title" value={formData.title} onChange={handleChange} required className="admin-input w-full" placeholder="e.g. AWS Certified Developer" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Issuing Organization</label>
              <input name="org" value={formData.org} onChange={handleChange} required className="admin-input w-full" placeholder="e.g. Amazon Web Services" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Issue Date</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required className="admin-input w-full" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expiry Date (Optional)</label>
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="admin-input w-full" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Credential ID</label>
              <input name="credentialId" value={formData.credentialId} onChange={handleChange} className="admin-input w-full" placeholder="ABC-123-XYZ" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Verification URL</label>
              <input name="credentialUrl" value={formData.credentialUrl} onChange={handleChange} className="admin-input w-full" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="admin-input w-full bg-background/50">
                <option value="Web Development">Web Development</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col justify-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isVisible" checked={formData.isVisible} onChange={handleChange} className="accent-primary" />
                <span className="text-sm font-medium">Visible on Portfolio</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="accent-primary" />
                <span className="text-sm font-medium">Featured (Highlight)</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description/Skills Learned</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="admin-input w-full resize-none" placeholder="Briefly describe what you learned..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Certificate Image</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                {formData.imgUrl ? (
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <ImageIcon size={20} /> Image Uploaded (Click to Change)
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    {uploadProgress > 0 ? `Uploading ${Math.round(uploadProgress)}%` : "Click to Upload Image"}
                  </div>
                )}
              </label>
              {formData.imgUrl && (
                <div className="h-16 w-24 bg-card border rounded-lg overflow-hidden shrink-0">
                  <img src={formData.imgUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={loading} className="cosmic-button flex items-center gap-2">
              {loading ? 'Saving...' : <><Save size={20}/> {editId ? 'Update' : 'Add'} Certificate</>}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Active Certificates</h3>
        {fetching ? (
          <div className="text-center p-8 text-muted-foreground">Loading certificates...</div>
        ) : certs.length === 0 ? (
          <div className="bg-card p-12 rounded-xl border border-dashed text-center text-muted-foreground">No certifications added.</div>
        ) : (
          <div className="grid gap-4">
            {certs.map((cert, index) => (
              <div key={cert.id} className="bg-card p-4 rounded-xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1 pr-2 border-r border-border opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
                    <button onClick={() => moveOrder(index, 'up')} disabled={index === 0} className="hover:text-primary disabled:opacity-30"><ChevronUp size={18}/></button>
                    <button onClick={() => moveOrder(index, 'down')} disabled={index === certs.length - 1} className="hover:text-primary disabled:opacity-30"><ChevronDown size={18}/></button>
                  </div>
                  <div className="h-12 w-16 bg-secondary/50 rounded-lg overflow-hidden shrink-0 border border-white/5">
                    <img src={cert.imgUrl} alt={cert.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold flex flex-wrap items-center gap-2 truncate">
                       <span className="truncate">{cert.title}</span>
                       <div className="flex gap-1">
                         {cert.isFeatured && <span className="text-[8px] bg-primary/20 text-primary px-1 py-0.5 rounded">Featured</span>}
                         {!cert.isVisible && <span className="text-[8px] bg-red-500/10 text-red-500 px-1 py-0.5 rounded">Hidden</span>}
                       </div>
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">{cert.org} • {cert.issueDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="flex sm:hidden items-center gap-2 mr-auto">
                    <button onClick={() => moveOrder(index, 'up')} disabled={index === 0} className="p-1.5 hover:text-primary disabled:opacity-30 border border-border rounded"><ChevronUp size={16}/></button>
                    <button onClick={() => moveOrder(index, 'down')} disabled={index === certs.length - 1} className="p-1.5 hover:text-primary disabled:opacity-30 border border-border rounded"><ChevronDown size={16}/></button>
                  </div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <button onClick={() => handleEdit(cert)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Pencil size={18}/></button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationManager;
