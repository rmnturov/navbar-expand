import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NewSidebar from './components/NewSidebar';
import Sidebar3 from './components/Sidebar3';
import Sidebar4 from './components/Sidebar4';
import Sidebar5 from './components/Sidebar5';
import Sidebar6 from './components/Sidebar6';
import MainContent from './components/MainContent';
import { SidebarProvider, useSidebarContext } from './contexts/SidebarContext';
import { Sidebar4DebugProvider } from './contexts/Sidebar4DebugContext';
import { Sidebar5DebugProvider } from './contexts/Sidebar5DebugContext';
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
                        currentPath === '/sidebar4' ? 'sidebar4' : 
                        currentPath === '/sidebar5' ? 'sidebar5' : 
                        currentPath === '/sidebar6' ? 'sidebar6' : 'old';

  const handleSidebarChange = (sidebar) => {
    // Навигация через URL вместо локального состояния
    if (sidebar === 'new') {
      navigate('/sidebar2');
    } else if (sidebar === 'sidebar3') {
      navigate('/sidebar3');
    } else if (sidebar === 'sidebar4') {
      navigate('/sidebar4');
    } else if (sidebar === 'sidebar5') {
      navigate('/sidebar5');
    } else if (sidebar === 'sidebar6') {
      navigate('/sidebar6');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`app ${isPinned ? 'pinned' : ''}`}>
      {currentSidebar === 'old' ? <Sidebar /> : 
       currentSidebar === 'new' ? <NewSidebar /> : 
       currentSidebar === 'sidebar3' ? <Sidebar3 /> :
       currentSidebar === 'sidebar4' ? <Sidebar4DebugProvider><Sidebar4 /></Sidebar4DebugProvider> :
       currentSidebar === 'sidebar5' ? <Sidebar5DebugProvider><Sidebar5 /></Sidebar5DebugProvider> :
       <Sidebar6 />}
      <MainContent onSidebarChange={handleSidebarChange} currentSidebar={currentSidebar} />
    </div>
  );
}

function App() {
  return (
    <Router basename="/navbar-expand">
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/sidebar2" replace />} />
          <Route path="/sidebar2" element={<AppContent />} />
          <Route path="/sidebar3" element={<AppContent />} />
          <Route path="/sidebar4" element={<AppContent />} />
          <Route path="/sidebar5" element={<AppContent />} />
          <Route path="/sidebar6" element={<AppContent />} />
          <Route path="*" element={<Navigate to="/sidebar2" replace />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;
