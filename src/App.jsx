import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NewSidebar from './components/NewSidebar';
import Sidebar3 from './components/Sidebar3';
import Sidebar4 from './components/Sidebar4';
import MainContent from './components/MainContent';
import { SidebarProvider, useSidebarContext } from './contexts/SidebarContext';
import { Sidebar4DebugProvider } from './contexts/Sidebar4DebugContext';
import './App.css';

function AppContent() {
  const { isPinned } = useSidebarContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Проверяем, есть ли сохраненный путь для редиректа (из 404.html)
  React.useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);
  
  // Определяем текущий сайдбар на основе URL
  // Для BrowserRouter используем pathname
  const currentPath = location.pathname;
  const currentSidebar = currentPath === '/sidebar2' ? 'new' : 
                        currentPath === '/sidebar3' ? 'sidebar3' : 
                        currentPath === '/sidebar4' ? 'sidebar4' : 'old';

  const handleSidebarChange = (sidebar) => {
    // Навигация через URL вместо локального состояния
    if (sidebar === 'new') {
      navigate('/sidebar2');
    } else if (sidebar === 'sidebar3') {
      navigate('/sidebar3');
    } else if (sidebar === 'sidebar4') {
      navigate('/sidebar4');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`app ${isPinned ? 'pinned' : ''}`}>
      {currentSidebar === 'old' ? <Sidebar /> : 
       currentSidebar === 'new' ? <NewSidebar /> : 
       currentSidebar === 'sidebar3' ? <Sidebar3 /> :
       <Sidebar4DebugProvider><Sidebar4 /></Sidebar4DebugProvider>}
      <MainContent onSidebarChange={handleSidebarChange} currentSidebar={currentSidebar} />
    </div>
  );
}

function App() {
  return (
    <Router basename="/navbar-expand">
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/sidebar2" element={<AppContent />} />
          <Route path="/sidebar3" element={<AppContent />} />
          <Route path="/sidebar4" element={<AppContent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;
