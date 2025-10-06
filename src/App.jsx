import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NewSidebar from './components/NewSidebar';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import { SidebarProvider, useSidebarContext } from './contexts/SidebarContext';
import './App.css';

function AppContent() {
  const { isPinned } = useSidebarContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Определяем текущий сайдбар на основе URL
  // Для HashRouter pathname всегда будет '/', а hash содержит маршрут
  const currentPath = location.hash.replace('#', '') || '/';
  let currentSidebar = 'old';
  if (currentPath === '/bento-visible') {
    currentSidebar = 'new';
  } else if (currentPath === '/navbar') {
    currentSidebar = 'navbar';
  }

  const handleSidebarChange = (sidebar) => {
    // Навигация через URL вместо локального состояния
    if (sidebar === 'new') {
      navigate('/bento-visible');
    } else if (sidebar === 'navbar') {
      navigate('/navbar');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`app ${isPinned ? 'pinned' : ''}`}>
      {currentSidebar === 'old' ? <Sidebar /> : 
       currentSidebar === 'new' ? <NewSidebar /> : 
       <Navbar />}
      <MainContent onSidebarChange={handleSidebarChange} currentSidebar={currentSidebar} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/bento-visible" element={<AppContent />} />
          <Route path="/navbar" element={<AppContent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;
