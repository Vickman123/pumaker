import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Learn } from './pages/Learn';
import { AreaDetail } from './pages/AreaDetail';
import { Courses } from './pages/Courses';
import { Videoteca } from './pages/Videoteca';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Tools } from './pages/Tools';
import { Simulators } from './pages/Simulators';
import { Community } from './pages/Community';
import { About } from './pages/About';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-puma-surface text-puma-text">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorar" element={<Explore />} />
            <Route path="/recursos" element={<Explore />} />
            <Route path="/aprende" element={<Learn />} />
            <Route path="/aprende/:slug" element={<AreaDetail />} />
            <Route path="/cursos" element={<Courses />} />
            <Route path="/videoteca" element={<Videoteca />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/:slug" element={<ProjectDetail />} />
            <Route path="/herramientas" element={<Tools />} />
            <Route path="/simuladores" element={<Simulators />} />
            <Route path="/comunidad" element={<Community />} />
            <Route path="/acerca" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
