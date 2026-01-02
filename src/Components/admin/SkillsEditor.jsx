import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Trash2, Code, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const SkillsEditor = () => {
  const [skills, setSkills] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', level: 100, category: 'Frontend' });

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("category", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skillsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSkills(skillsData);
      setFetching(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Adding skill...');
    try {
      await addDoc(collection(db, "skills"), {
        ...formData,
        level: Number(formData.level)
      });
      toast.success('Skill added!', { id: toastId });
      setFormData({ name: '', level: 100, category: 'Frontend' });
      setIsAdding(false);
    } catch {
      toast.error('Add failed', { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await deleteDoc(doc(db, "skills", id));
      toast.success("Skill deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Code className="text-primary"/> Skills Editor
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="cosmic-button flex items-center gap-2"
        >
          {isAdding ? <><X size={20}/> Cancel</> : <><Plus size={20}/> Add Skill</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg border border-border grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Skill Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. React"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 bg-background border border-input rounded focus:ring-1 focus:ring-primary outline-hidden"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 bg-background border border-input rounded focus:ring-1 focus:ring-primary outline-hidden"
            >
               <option value="Frontend">Frontend</option>
               <option value="Backend">Backend</option>
               <option value="Tools">Tools</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold">Level ({formData.level}%)</label>
            <input 
              type="range" 
              min="0" max="100"
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              className="w-full accent-primary"
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button type="submit" className="cosmic-button text-sm px-6">Save Skill</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fetching ? (
          <div className="col-span-full text-center text-muted-foreground p-8">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="col-span-full bg-card p-12 text-center text-muted-foreground rounded-lg border border-dashed border-border">
            No skills added.
          </div>
        ) : (
          skills.map((skill) => (
            <div key={skill.id} className="bg-card p-4 rounded-lg border border-border flex justify-between items-center group hover:border-primary/50 transition-all">
              <div>
                <h4 className="font-bold">{skill.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full">{skill.category}</span>
                   <span className="text-[10px] text-primary">{skill.level}%</span>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(skill.id)}
                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsEditor;
