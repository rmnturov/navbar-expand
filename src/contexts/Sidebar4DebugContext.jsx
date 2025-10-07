import React, { createContext, useContext } from 'react';

const Sidebar4DebugContext = createContext();

export const Sidebar4DebugProvider = ({ children }) => {
  const [debugInfo, setDebugInfo] = React.useState({
    showTooltips: false,
    hoveredItemIndex: null,
    isQuickReturn: false,
    tooltipDelayActive: false,
    quickReturnActive: false,
    lastAction: 'none',
    showFloatingButton: false,
    isPinned: false
  });

  const updateDebugInfo = React.useCallback((updates) => {
    setDebugInfo(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <Sidebar4DebugContext.Provider value={{ debugInfo, updateDebugInfo }}>
      {children}
    </Sidebar4DebugContext.Provider>
  );
};

export const useSidebar4Debug = () => {
  const context = useContext(Sidebar4DebugContext);
  if (!context) {
    throw new Error('useSidebar4Debug must be used within a Sidebar4DebugProvider');
  }
  return context;
};
