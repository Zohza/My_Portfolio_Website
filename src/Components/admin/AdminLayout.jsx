import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import SideBar from "./SideBar";
import { ThemeToggle } from "../ThemeToggle";

import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-2">
          <Menu 
            className="text-primary cursor-pointer" 
            onClick={() => setIsSidebarOpen(true)} 
          />
          <h1 className="font-bold text-lg">Admin</h1>
        </div>
        <ThemeToggle />
      </div>

      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:hidden">
         {/* ThemeToggle is in mobile header above */}
      </div>
      <div className="hidden lg:block">
        <ThemeToggle />
      </div>
      
      <main className="lg:pl-64 p-4 md:p-8 pt-24 lg:pt-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
