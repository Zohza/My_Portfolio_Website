import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { storage } from "../../lib/firebase";
import { Upload, Trash2, Copy, Check, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const MediaLibrary = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  const fetchImages = async () => {
    const listRef = ref(storage, 'uploads/');
    try {
      const res = await listAll(listRef);
      const fileData = await Promise.all(res.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url, fullPath: item.fullPath };
      }));
      setFiles(fileData);
    } catch {
      // Silence fetch errors in UI
    }
  };

  useEffect(() => {
    const init = async () => {
        await fetchImages();
    };
    init();
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
        toast.error("File too large. Max 2MB.");
        return;
    }

    setUploading(true);
    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      }, 
      () => {
        toast.error("Upload failed");
        setUploading(false);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(() => {
          toast.success("Image uploaded!");
          setUploading(false);
          setProgress(0);
          fetchImages();
        });
      }
    );
  };

  const handleDelete = async (fullPath) => {
    if(!window.confirm("Delete this image?")) return;
    try {
      const fileRef = ref(storage, fullPath);
      await deleteObject(fileRef);
      toast.success("Image deleted");
      fetchImages();
    } catch {
      toast.error("Delete failed");
    }
  };

  const copyToClipboard = (url, name) => {
    navigator.clipboard.writeText(url);
    setCopiedId(name);
    toast.success("URL copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <ImageIcon className="text-primary"/> Media Library
        </h2>
        <label className="cosmic-button flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
           <Upload size={20} />
           <span>{uploading ? `Uploading ${Math.round(progress)}%` : "Upload Image"}</span>
           <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
        </label>
      </div>

      {uploading && (
        <div className="w-full bg-secondary rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.length === 0 ? (
          <div className="col-span-full py-20 text-center text-muted-foreground bg-card rounded-lg border border-dashed border-border">
            Your media library is empty.
          </div>
        ) : (
          files.map((file) => (
            <div key={file.name} className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all shadow-sm">
                <div className="aspect-square overflow-hidden bg-secondary/50">
                   <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex justify-between items-center p-2 bg-card/90">
                   <button 
                     onClick={() => copyToClipboard(file.url, file.name)}
                     className="p-2 hover:text-primary transition-colors"
                     title="Copy URL"
                   >
                     {copiedId === file.name ? <Check size={18} /> : <Copy size={18} />}
                   </button>
                   <button 
                     onClick={() => handleDelete(file.fullPath)}
                     className="p-2 hover:text-red-500 transition-colors"
                     title="Delete"
                   >
                     <Trash2 size={18} />
                   </button>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
