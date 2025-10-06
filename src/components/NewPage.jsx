import React from 'react';
import { SidebarProvider } from '../contexts/SidebarContext';
import NewSidebar from './NewSidebar';
import MainContent from './MainContent';

const NewPage = () => {
  return (
    <SidebarProvider>
      <div className="app">
        <NewSidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  );
};

export default NewPage;
