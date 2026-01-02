import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Mail, Clock, Calendar } from 'lucide-react';

const MessageViewer = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const msgs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(msgs);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
     return <div className="text-center p-10">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <Mail className="text-primary"/> Messages
      </h2>

      {messages.length === 0 ? (
        <div className="bg-card p-12 rounded-lg border border-border text-center text-muted-foreground">
           No messages yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-primary hover:underline">{msg.email}</a>
                </div>
                {msg.timestamp && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
                    <Calendar size={14} />
                    {new Date(msg.timestamp.toDate()).toLocaleDateString()}
                    <Clock size={14} className="ml-2" />
                    {new Date(msg.timestamp.toDate()).toLocaleTimeString()}
                  </div>
                )}
              </div>
              <p className="bg-secondary/20 p-4 rounded-md text-foreground/90 whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageViewer;
