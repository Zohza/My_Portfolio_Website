import React from 'react';
import { X, ExternalLink, Download, Calendar, ShieldCheck, Award } from 'lucide-react';

const CertModal = ({ cert, isOpen, onClose }) => {
  if (!isOpen || !cert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-4xl bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-background/50 hover:bg-red-500/20 hover:text-red-500 transition-all">
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 h-full max-h-[90vh]">
          {/* Left: Image */}
          <div className="lg:col-span-3 bg-secondary/30 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/5">
            <img src={cert.imgUrl} alt={cert.title} className="max-w-full max-h-full object-contain rounded-lg shadow-lg" />
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 p-8 flex flex-col gap-6 overflow-y-auto">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">{cert.category}</span>
              <h2 className="text-3xl font-bold leading-tight">{cert.title}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award size={18} className="text-primary" />
                <span className="font-medium text-foreground">{cert.org}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/40 p-3 rounded-2xl border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Issued</p>
                <div className="flex items-center gap-2 text-sm">
                   <Calendar size={14} className="text-primary" />
                   {cert.issueDate}
                </div>
              </div>
              {cert.expiryDate && (
                <div className="bg-background/40 p-3 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Expires</p>
                  <div className="flex items-center gap-2 text-sm">
                     <Calendar size={14} className="text-red-400" />
                     {cert.expiryDate}
                  </div>
                </div>
              )}
            </div>

            {cert.credentialId && (
              <div className="bg-background/40 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-2">
                   <ShieldCheck size={12} className="text-primary" /> Credential ID
                </p>
                <code className="text-xs block bg-black/20 p-2 rounded-lg mt-1 font-mono">{cert.credentialId}</code>
              </div>
            )}

            {cert.description && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider">About this Certification</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </div>
            )}

            <div className="mt-auto pt-6 flex flex-col gap-3">
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cosmic-button w-full flex items-center justify-center gap-2 py-3 rounded-xl"
                >
                  Verify Credential <ExternalLink size={18}/>
                </a>
              )}
              <a 
                href={cert.imgUrl} 
                download={`${cert.title}.png`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-medium"
              >
                Download Certificate <Download size={18}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertModal;
