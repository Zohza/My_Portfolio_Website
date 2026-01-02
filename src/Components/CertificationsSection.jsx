import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Award, Filter, ExternalLink, ChevronRight } from 'lucide-react';
import CertModal from './CertModal';

const CertificationsSection = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "certifications"), 
      where("isVisible", "==", true),
      orderBy("order", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const certsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCerts(certsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!loading && certs.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 justify-center">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold">
              Professional <span className="text-primary">Certifications</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed ">
              Validation of my expertise through industry-recognized programs and continuous learning.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 rounded-3xl bg-card/50 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert) => (
              <div 
                key={cert.id} 
                className="group relative bg-card/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="absolute top-4 right-4 z-10">
                   {cert.isFeatured && (
                      <span className="bg-primary/20 text-primary backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-primary/20 flex items-center gap-1">
                        <Award size={12} /> Featured
                      </span>
                   )}
                </div>

                <div className="h-48 overflow-hidden bg-secondary/30 relative">
                  <img src={cert.imgUrl} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                </div>

                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">{cert.category}</p>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">{cert.title}</h3>
                    <p className="text-sm font-medium text-foreground/80">{cert.org}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-muted-foreground">{cert.issueDate}</span>
                    <div className="flex items-center gap-1 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      View Details <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CertModal 
        cert={selectedCert} 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
      />
    </section>
  );
};

export default CertificationsSection;
