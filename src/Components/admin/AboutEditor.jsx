import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, User } from 'lucide-react';
import toast from 'react-hot-toast';

const AboutEditor = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    headline: '',
    bio1: '',
    bio2: '',
    skillsSummary: '',
    cvUrl: ''
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docRef = doc(db, "content", "about");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching about info:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Saving about info...');
    try {
      await setDoc(doc(db, "content", "about"), {
        ...formData,
        updatedAt: new Date()
      });
      toast.success('About info updated!', { id: toastId });
    } catch (error) {
      console.error("Error saving about info:", error);
      toast.error('Save failed', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-center text-muted-foreground">Loading About info...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <User className="text-primary"/> About Editor
      </h2>

      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg border border-border space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Main Headline</label>
          <input 
            type="text" 
            name="headline" 
            value={formData.headline} 
            onChange={handleChange}
            placeholder="e.g. Passionate of building AI Products" 
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Biography Paragraph 1</label>
          <textarea 
            name="bio1" 
            value={formData.bio1} 
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Biography Paragraph 2</label>
          <textarea 
            name="bio2" 
            value={formData.bio2} 
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Skills Summary (Text under bio)</label>
          <input 
            type="text" 
            name="skillsSummary" 
            value={formData.skillsSummary} 
            onChange={handleChange}
            placeholder="e.g. python, reactjs, fastapi" 
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">CV/Resume Download URL</label>
          <input 
            type="text" 
            name="cvUrl" 
            value={formData.cvUrl} 
            onChange={handleChange}
            placeholder="Copy from Media Library..." 
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="cosmic-button flex items-center gap-2"
          >
            {loading ? 'Saving...' : <><Save size={20} /> Update About Section</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutEditor;
