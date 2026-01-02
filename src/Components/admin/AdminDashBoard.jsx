import React, { useState, useEffect } from "react";
import { Folder, Mail, FileText, Code } from "lucide-react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

const AdminDashBoard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    skills: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = [
      { key: 'projects', collection: 'projects', query: query(collection(db, "projects"), orderBy("createdAt", "desc")) },
      { key: 'blogs', collection: 'blogs', query: query(collection(db, "blogs"), orderBy("createdAt", "desc")) },
      { key: 'messages', collection: 'messages', query: query(collection(db, "messages"), orderBy("timestamp", "desc")) },
      { key: 'skills', collection: 'skills', query: query(collection(db, "skills"), orderBy("category", "asc")) }
    ];

    let loadedCount = 0;
    const unsubscribes = config.map(item => {
      return onSnapshot(item.query, (snapshot) => {
        setStats(prev => ({ ...prev, [item.key]: snapshot.size }));
        loadedCount++;
        if (loadedCount >= config.length) setLoading(false);
      }, () => {
        loadedCount++;
        if (loadedCount >= config.length) setLoading(false);
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, []);

  const metrics = [
    { label: 'Total Projects', value: stats.projects, icon: Folder, color: 'text-blue-500' },
    { label: 'Blog Posts', value: stats.blogs, icon: FileText, color: 'text-purple-500' },
    { label: 'Messages', value: stats.messages, icon: Mail, color: 'text-green-500' },
    { label: 'Total Skills', value: stats.skills, icon: Code, color: 'text-orange-500' },
  ];

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading dashboard data...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Manage your portfolio content in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-xl border border-border shadow-sm hover:border-primary/50 transition-all group">
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</p>
                   <h3 className="text-4xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className={`p-4 rounded-xl bg-secondary ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon size={24} />
                </div>
             </div>
          </div>
        ))}
      </div>
      
      <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
         <h2 className="text-xl font-bold mb-4">Welcome to your workspace</h2>
         <p className="text-muted-foreground leading-relaxed">
            From this dashboard, you can oversee your entire portfolio. Use the sidebar to navigate between 
            project management, blog writing, and responding to visitor inquiries. All your changes 
            are synced instantly to the live site.
         </p>
      </div>
    </div>
  );
};

export default AdminDashBoard;

