import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderPlus, 
  LogOut, 
  MessageSquare, 
  FileText,
  Image,
  User,
  Code,
  Award,
  X
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { cn } from '../../lib/utils';

const SideBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/projects', icon: FolderPlus, label: 'Projects' },
    { path: '/admin/blogs', icon: FileText, label: 'Blogs' },
    { path: '/admin/media', icon: Image, label: 'Media Library' },
    { path: '/admin/about', icon: User, label: 'About Editor' },
    { path: '/admin/skills', icon: Code, label: 'Skills Editor' },
    { path: '/admin/certifications', icon: Award, label: 'Certifications' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div className={cn(
        "w-64 h-screen border-r border-border fixed left-0 top-0 pt-20 px-4 flex flex-col justify-between z-40 transition-transform duration-300 lg:translate-x-0",
        "bg-card lg:bg-card/50",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col gap-2">
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground"
          >
            <X size={24} />
          </button>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="pb-8">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;