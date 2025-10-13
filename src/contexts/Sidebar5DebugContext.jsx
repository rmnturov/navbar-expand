import React, { createContext, useContext } from 'react';

const Sidebar5DebugContext = createContext();

export const Sidebar5DebugProvider = ({ children }) => {
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
    <Sidebar5DebugContext.Provider value={{ debugInfo, updateDebugInfo }}>
      {children}
    </Sidebar5DebugContext.Provider>
  );
};

export const useSidebar5Debug = () => {
  const context = useContext(Sidebar5DebugContext);
  if (!context) {
    throw new Error('useSidebar5Debug must be used within a Sidebar5DebugProvider');
  }
  return context;
};

