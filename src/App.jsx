import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { SidebarProvider, useSidebarContext } from './contexts/SidebarContext';
import './App.css';

function AppContent() {
  const { isPinned } = useSidebarContext();

  return (
    <div className={`app ${isPinned ? 'pinned' : ''}`}>
      <Sidebar />
      <MainContent />
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
