import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { Plus, Save, X, Pencil, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ProjectManager = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    imgUrl: '',
    demoUrl: '',
    github: '',
    isCompleted: true
  });
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [editId, setEditId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
      setFetching(false);
    }, (error) => {
      console.error("Error fetching projects: ", error);
      setFetching(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (project) => {
    setEditId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags.join(', '),
      imgUrl: project.imgUrl,
      demoUrl: project.demoUrl || '',
      github: project.github || '',
      isCompleted: project.isCompleted !== false
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    const toastId = toast.loading('Deleting project...');
    try {
      await deleteDoc(doc(db, "projects", projectId));
      toast.success('Project deleted successfully!', { id: toastId });
    } catch (error) {
      console.error("Error deleting project: ", error);
      toast.error('Error deleting project', { id: toastId });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Max 10MB.");
      return;
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      toast.error("Cloudinary not configured. Check your .env file.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading to Cloudinary...");

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData(prev => ({ ...prev, imgUrl: data.secure_url }));
        toast.success("Image uploaded!", { id: toastId });
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Upload failed: " + error.message, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading(editId ? 'Updating project...' : 'Adding project...');
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      const projectData = {
        ...formData,
        tags: tagsArray,
        updatedAt: new Date()
      };

      if (editId) {
        await updateDoc(doc(db, "projects", editId), projectData);
        toast.success('Project updated successfully!', { id: toastId });
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: new Date()
        });
        toast.success('Project added successfully!', { id: toastId });
      }
      
      setFormData({ title: '', description: '', tags: '', imgUrl: '', demoUrl: '', github: '' });
      setIsAdding(false);
      setEditId(null);
    } catch (error) {
      console.error("Error saving project: ", error);
      toast.error(editId ? 'Error updating project' : 'Error adding project', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Projects</h2>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            if (isAdding) {
              setEditId(null);
              setFormData({ title: '', description: '', tags: '', imgUrl: '', demoUrl: '', github: '', isCompleted: true });
            }
          }}
          className="cosmic-button flex items-center gap-2"
        >
          {isAdding ? <><X size={20}/> Cancel</> : <><Plus size={20}/> Add Project</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-card p-6 rounded-lg border border-border animate-in fade-in slide-in-from-top-4">
          <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  placeholder="e.g. E-commerce Store" 
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Image</label>
                <div className="flex items-center gap-4">
                  <label className={`flex-1 border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
                    {formData.imgUrl ? (
                      <div className="flex items-center justify-center gap-2 text-primary font-medium">
                        <ImageIcon size={20} /> Image Uploaded (Click to Change)
                      </div>
                    ) : (
                      <div className="text-muted-foreground">
                        {isUploading ? "Uploading..." : "Click to Upload Image"}
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Demo URL</label>
                <input 
                  type="url" 
                  name="demoUrl" 
                  value={formData.demoUrl} 
                  onChange={handleChange}
                  placeholder="https://..." 
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <input 
                  type="url" 
                  name="github" 
                  value={formData.github} 
                  onChange={handleChange}
                  placeholder="https://github.com/..." 
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <input 
                  type="text" 
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleChange}
                  placeholder="React, CSS, Firebase" 
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  placeholder="Project details..." 
                  rows="4"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden resize-none"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    name="isCompleted" 
                    checked={formData.isCompleted} 
                    onChange={(e) => setFormData({ ...formData, isCompleted: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
                <span className="text-sm font-medium">
                  {formData.isCompleted ? 'Completed' : 'In Progress'}
                </span>
              </label>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="cosmic-button flex items-center gap-2"
              >
                {loading ? 'Saving...' : <><Save size={20} /> Save Project</>}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Existing Projects</h3>
        
        {fetching ? (
          <div className="text-center p-8">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="bg-card p-8 rounded-lg border border-border border-dashed text-center text-muted-foreground">
            No projects added yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-card p-4 rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded bg-secondary overflow-hidden shrink-0">
                    <img src={project.imgUrl} alt={project.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold line-clamp-1">{project.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${project.isCompleted !== false ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {project.isCompleted !== false ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags && project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-secondary px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                      {project.tags && project.tags.length > 3 && <span className="text-[10px] text-muted-foreground">+{project.tags.length - 3}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 justify-end sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    title="Edit Project"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                    title="Delete Project"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
