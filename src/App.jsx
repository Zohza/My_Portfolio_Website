import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import AdminDashBoard from "./Components/admin/AdminDashBoard";
import AdminLayout from "./Components/admin/AdminLayout";
import ProjectManager from "./Components/admin/ProjectManager";
import MessageViewer from "./Components/admin/MessageViewer";
import BlogManager from "./Components/admin/BlogManager";
import MediaLibrary from "./Components/admin/MediaLibrary";
import AboutEditor from "./Components/admin/AboutEditor";
import SkillsEditor from "./Components/admin/SkillsEditor";
import CertificationManager from "./Components/admin/CertificationManager";
import Login from "./Components/login";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <div id="root">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="messages" element={<MessageViewer />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="skills" element={<SkillsEditor />} />
            <Route path="certifications" element={<CertificationManager />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" reverseOrder={false} />
      </BrowserRouter>
    </div>
  );
};

export default App;
