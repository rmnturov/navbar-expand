import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import NewSidebar from './components/NewSidebar';
import MainContent from './components/MainContent';
import { SidebarProvider, useSidebarContext } from './contexts/SidebarContext';
import './App.css';

function AppContent() {
  const { isPinned } = useSidebarContext();
  const [currentSidebar, setCurrentSidebar] = useState('old');

  const handleSidebarChange = (sidebar) => {
    setCurrentSidebar(sidebar);
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
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  );
}

export default App;
