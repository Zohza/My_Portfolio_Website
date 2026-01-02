import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Save, X, FileText, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogManager = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    excerpt: ''
  });

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogsData);
      setFetching(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Publishing blog post...');
    try {
      await addDoc(collection(db, "blogs"), {
        ...formData,
        createdAt: new Date()
      });
      toast.success('Blog post published!', { id: toastId });
      setFormData({ title: '', content: '', category: '', excerpt: '' });
      setIsAdding(false);
    } catch (error) {
       console.error("Error adding blog: ", error);
      toast.error('Error publishing post', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      toast.success('Post deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="text-primary"/> Blogs
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="cosmic-button flex items-center gap-2"
        >
          {isAdding ? <><X size={20}/> Cancel</> : <><Plus size={20}/> New Post</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-card p-6 rounded-lg border border-border animate-in fade-in slide-in-from-top-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                placeholder="Post Title" 
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <input 
                type="text" 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                placeholder="e.g. AI, Development" 
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Excerpt</label>
              <textarea 
                name="excerpt" 
                value={formData.excerpt} 
                onChange={handleChange}
                placeholder="Short summary..." 
                rows="2"
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <textarea 
                name="content" 
                value={formData.content} 
                onChange={handleChange}
                placeholder="Full article content (Markdown supported later...)" 
                rows="10"
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-hidden resize-none"
                required
              />
            </div>
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="cosmic-button flex items-center gap-2"
              >
                {loading ? 'Publishing...' : <><Save size={20} /> Publish Post</>}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Posts</h3>
        {fetching ? (
          <div className="text-center p-8 text-muted-foreground">Loading posts...</div>
        ) : blogs.length === 0 ? (
          <div className="bg-card p-12 rounded-lg border border-border border-dashed text-center text-muted-foreground">
            No blog posts yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-card p-4 rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-colors group">
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-lg truncate">{blog.title}</h4>
                  <div className="flex gap-2 items-center mt-1">
                    {blog.category && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full truncate max-w-[100px]">{blog.category}</span>}
                    <span className="text-xs text-muted-foreground">
                      {blog.createdAt?.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <button 
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                  >
                    <Trash2 size={18} />
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

export default BlogManager;
