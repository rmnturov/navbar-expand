import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NewSidebar from './components/NewSidebar';
import MainContent from './components/MainContent';
import { SidebarProvider, useSidebarContext } from './contexts/SidebarContext';
import './App.css';

function AppContent() {
  const { isPinned } = useSidebarContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Определяем текущий сайдбар на основе URL
  const currentSidebar = location.pathname === '/bento-visible' ? 'new' : 'old';

  const handleSidebarChange = (sidebar) => {
    // Навигация через URL вместо локального состояния
    if (sidebar === 'new') {
      navigate('/bento-visible');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`app ${isPinned ? 'pinned' : ''}`}>
      {currentSidebar === 'old' ? <Sidebar /> : <NewSidebar />}
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;
