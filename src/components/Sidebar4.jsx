import React, { useState, useRef, useEffect } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useSidebar4Debug } from "../contexts/Sidebar4DebugContext";
import KoobiqIcon from "./KoobiqIcon";
import { menuItems, bottomMenuItems, Logo } from "../data/menuItems.jsx";
import "./Sidebar4.css";

const Sidebar4 = () => {
  const {
    isPinned,
    isHovered,
    activeItem,
    togglePin,
    collapseMenu,
    handleMouseEnter,
    handleMouseLeave,
    setActiveMenuItem,
  } = useSidebarContext();

  const { updateDebugInfo } = useSidebar4Debug();

  const [showTooltips, setShowTooltips] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  
  // Состояние для позиций tooltips
  const [tooltipPositions, setTooltipPositions] = useState({});
  
  // Refs для элементов меню
  const menuItemRefs = useRef({});
  const bottomMenuItemRefs = useRef({});
  const allAppsButtonRef = useRef(null);
  
  // Таймеры для задержек
  const tooltipDelayTimer = useRef(null);
  const quickReturnTimer = useRef(null);
  const [isQuickReturn, setIsQuickReturn] = useState(false);

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (tooltipDelayTimer.current) {
        clearTimeout(tooltipDelayTimer.current);
      }
      if (quickReturnTimer.current) {
        clearTimeout(quickReturnTimer.current);
      }
    };
  }, []);

  // Обновляем отладочную информацию при изменении состояния
  useEffect(() => {
    updateDebugInfo({ 
      isPinned,
      showTooltips,
      hoveredItemIndex,
      isQuickReturn,
      showFloatingButton
    });
  }, [isPinned, showTooltips, hoveredItemIndex, isQuickReturn, showFloatingButton, updateDebugInfo]);

  // Рассчитываем позиции tooltips при изменении размера окна и при первом рендере
  useEffect(() => {
    const handleResize = () => {
      calculateTooltipPositions();
    };

    // Рассчитываем позиции при первом рендере
    calculateTooltipPositions();

    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = (index) => {
    setActiveMenuItem(index);
  };

  // Функция для расчета позиций tooltips
  const calculateTooltipPositions = () => {
    const positions = {};
    
    // Рассчитываем позицию для кнопки "Все приложения"
    if (allAppsButtonRef.current) {
      const rect = allAppsButtonRef.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      
      positions[-1] = {
        top: elementCenter + window.scrollY,
        left: rect.right + 8, // 8px отступ справа от элемента (базовая позиция)
      };
    }
    
    // Рассчитываем позиции для основных пунктов меню
    menuItems.forEach((item, index) => {
      const ref = menuItemRefs.current[index];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        // Позиционируем tooltip по центру элемента
        // CSS tooltip использует transform: translateY(-50%), поэтому позиционируем по центру
        const elementCenter = rect.top + rect.height / 2;
        
        positions[index] = {
          top: elementCenter + window.scrollY,
          left: rect.right + 16, // 16px отступ справа от элемента
        };
      }
    });
    
    // Рассчитываем позиции для нижних пунктов меню
    bottomMenuItems.forEach((item, index) => {
      const bottomIndex = menuItems.length + index;
      const ref = bottomMenuItemRefs.current[index];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        // Позиционируем tooltip по центру элемента
        // CSS tooltip использует transform: translateY(-50%), поэтому позиционируем по центру
        const elementCenter = rect.top + rect.height / 2;
        
        positions[bottomIndex] = {
          top: elementCenter + window.scrollY,
          left: rect.right + 16, // 16px отступ справа от элемента
        };
      }
    });
    
    setTooltipPositions(positions);
  };

  const handleItemMouseEnter = (index) => {
    if (!isPinned) {
      // Пересчитываем позиции tooltips при hover
      calculateTooltipPositions();
      
      // Если tooltips уже показаны, просто меняем активный элемент без задержки
      if (showTooltips) {
        setHoveredItemIndex(index);
        updateDebugInfo({ 
          hoveredItemIndex: index, 
          lastAction: `change-active-${index}` 
        });
        return;
      }
      
      // Если это быстрый возврат (менее 200ms), показываем мгновенно
      if (isQuickReturn) {
        setShowTooltips(true);
        setHoveredItemIndex(index);
        setIsQuickReturn(false);
        updateDebugInfo({ 
          showTooltips: true, 
          hoveredItemIndex: index, 
          isQuickReturn: false,
          tooltipDelayActive: false,
          quickReturnActive: false,
          lastAction: `quick-return-${index}` 
        });
        return;
      }
      
      // Иначе показываем с задержкой 700ms
      updateDebugInfo({ 
        tooltipDelayActive: true,
        lastAction: `start-delay-${index}` 
      });
      tooltipDelayTimer.current = setTimeout(() => {
        setShowTooltips(true);
        setHoveredItemIndex(index);
        updateDebugInfo({ 
          showTooltips: true, 
          hoveredItemIndex: index,
          tooltipDelayActive: false,
          lastAction: `delay-complete-${index}` 
        });
      }, 700);
    }
  };

  const handleItemMouseLeave = () => {
    if (!isPinned) {
      // Очищаем таймер задержки
      if (tooltipDelayTimer.current) {
        clearTimeout(tooltipDelayTimer.current);
        tooltipDelayTimer.current = null;
        updateDebugInfo({ 
          tooltipDelayActive: false,
          lastAction: 'clear-delay-timer' 
        });
      }
      
      // НЕ скрываем tooltips при уходе с элемента - они остаются видимыми
      // setShowTooltips(false);
      // setHoveredItemIndex(null);
      
      // Запускаем таймер быстрого возврата на 200ms
      updateDebugInfo({ 
        quickReturnActive: true,
        lastAction: 'start-quick-return' 
      });
      quickReturnTimer.current = setTimeout(() => {
        setIsQuickReturn(false);
        updateDebugInfo({ 
          isQuickReturn: false,
          quickReturnActive: false,
          lastAction: 'quick-return-expired' 
        });
      }, 200);
      setIsQuickReturn(true);
    }
  };

  const handleSidebarMouseEnter = () => {
    // Всегда показываем floating кнопку при наведении на сайдбар
    setShowFloatingButton(true);
    updateDebugInfo({ showFloatingButton: true });
    
    if (!isPinned) {
      // Если это быстрый возврат (менее 200ms), показываем tooltips мгновенно
      if (isQuickReturn) {
        setShowTooltips(true);
        setHoveredItemIndex(null); // Показываем все tooltips без выделения
        setIsQuickReturn(false);
        updateDebugInfo({ 
          showTooltips: true, 
          hoveredItemIndex: null,
          isQuickReturn: false,
          quickReturnActive: false,
          lastAction: 'sidebar-quick-return' 
        });
      } else {
        updateDebugInfo({ lastAction: 'sidebar-enter' });
      }
    }
    handleMouseEnter();
  };

  const handleSidebarMouseLeave = () => {
    // Всегда скрываем floating кнопку при уходе с сайдбара
    setShowFloatingButton(false);
    updateDebugInfo({ showFloatingButton: false });
    
    if (!isPinned) {
      // Очищаем таймер задержки
      if (tooltipDelayTimer.current) {
        clearTimeout(tooltipDelayTimer.current);
        tooltipDelayTimer.current = null;
        updateDebugInfo({ 
          tooltipDelayActive: false,
          lastAction: 'sidebar-clear-delay' 
        });
      }
      
      setShowTooltips(false);
      setHoveredItemIndex(null);
      updateDebugInfo({ 
        showTooltips: false, 
        hoveredItemIndex: null 
      });
      
      // Запускаем таймер быстрого возврата на 200ms
      updateDebugInfo({ 
        quickReturnActive: true,
        lastAction: 'sidebar-start-quick-return' 
      });
      quickReturnTimer.current = setTimeout(() => {
        setIsQuickReturn(false);
        updateDebugInfo({ 
          isQuickReturn: false,
          quickReturnActive: false,
          lastAction: 'sidebar-quick-return-expired' 
        });
      }, 200);
      setIsQuickReturn(true);
    }
    handleMouseLeave();
  };

  const handleExpandClick = () => {
    togglePin();
  };

  const handleCollapseClick = () => {
    collapseMenu();
  };

  return (
    <>
    <nav
      className={`sidebar4 ${isPinned ? "pinned" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleSidebarMouseEnter}
      onMouseLeave={handleSidebarMouseLeave}
    >
      <div className="sidebar4-header">
        {/* Пункт меню "Все приложения" */}
        <div className="header-menu-item">
          <button 
            ref={allAppsButtonRef}
            className="menu-link all-apps-menu"
            onMouseEnter={() => handleItemMouseEnter(-1)}
            onMouseLeave={handleItemMouseLeave}
          >
            <div className="menu-link-inner">
              <KoobiqIcon name="grid-squares" size={16} className="menu-icon" />
              <span className="menu-text">Все приложения</span>
            </div>
          </button>
        </div>
        
        {/* Логотип и название приложения */}
        <div className="header-row">
          <div className="logo-section-static">
            <Logo className="logo" />
            <span className="app-name-static">App Name</span>
          </div>
        </div>
      </div>

      <ul className="menu-list">
        {menuItems.map((item, index) => {
          return (
            <li key={index} className="menu-item">
              <a
                href={item.href}
                id={item.id}
                className={`menu-link ${activeItem === index ? "active" : ""}`}
                onClick={() => handleItemClick(index)}
                onMouseEnter={() => handleItemMouseEnter(index)}
                onMouseLeave={handleItemMouseLeave}
                aria-current={activeItem === index ? "page" : undefined}
                title={item.text}
              >
                <div 
                  ref={(el) => (menuItemRefs.current[index] = el)}
                  className="menu-link-inner"
                >
                  <KoobiqIcon name={item.icon} size={16} className="menu-icon" />
                  <span className="menu-text">{item.text}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Нижний блок пунктов меню */}
      <ul className="sidebar4-bottom-menu-list">
        {bottomMenuItems.map((item, index) => {
          const bottomIndex = menuItems.length + index;
          return (
            <li key={bottomIndex} className="menu-item">
              <a
                href={item.href}
                id={item.id}
                className={`menu-link ${activeItem === bottomIndex ? "active" : ""}`}
                onClick={() => handleItemClick(bottomIndex)}
                onMouseEnter={() => handleItemMouseEnter(bottomIndex)}
                onMouseLeave={handleItemMouseLeave}
                aria-current={activeItem === bottomIndex ? "page" : undefined}
                title={item.text}
              >
                <div 
                  ref={(el) => (bottomMenuItemRefs.current[index] = el)}
                  className="menu-link-inner"
                >
                  <KoobiqIcon name={item.icon} size={16} className="menu-icon" />
                  <span className="menu-text">{item.text}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Floating кнопка Развернуть (показывается только в свернутом состоянии при hover) */}
      {!isPinned && (
        <button
          className={`floating-expand-button ${showFloatingButton ? 'visible' : ''}`}
          onClick={handleExpandClick}
          title="Развернуть меню"
        >
          <KoobiqIcon name="chevron-double-right-s" size={16} />
        </button>
      )}

      {/* Floating кнопка Свернуть (показывается только в развернутом состоянии при hover) */}
      {isPinned && (
        <button
          className={`floating-collapse-button ${showFloatingButton ? 'visible' : ''}`}
          onClick={handleCollapseClick}
          title="Свернуть меню"
        >
          <KoobiqIcon name="chevron-double-left-s" size={16} />
        </button>
      )}

      {/* Tooltips для свернутого меню */}
      {!isPinned && (
        <>
          {/* Tooltip для "Все приложения" */}
          <div
            className={`tooltip ${showTooltips ? "active" : ""} ${hoveredItemIndex === -1 ? "highlighted" : ""}`}
            style={{
              position: 'absolute',
              top: tooltipPositions[-1] ? `${tooltipPositions[-1].top}px` : '0px',
              left: tooltipPositions[-1] ? `${tooltipPositions[-1].left}px` : '0px',
              zIndex: 1000
            }}
          >
            Все приложения
          </div>
          
          {/* Tooltips для элементов меню */}
          {menuItems.map((item, index) => {
            const position = tooltipPositions[index];
            return (
              <div 
                key={index}
                className={`tooltip ${showTooltips ? "active" : ""} ${hoveredItemIndex === index ? "highlighted" : ""}`}
                style={{ 
                  position: 'absolute',
                  top: position ? `${position.top}px` : '0px',
                  left: position ? `${position.left}px` : '0px',
                  zIndex: 1000
                }}
              >
                {item.text}
              </div>
            );
          })}
          
          {/* Tooltips для нижних элементов меню */}
          {bottomMenuItems.map((item, index) => {
            const bottomIndex = menuItems.length + index;
            const position = tooltipPositions[bottomIndex];
            return (
              <div 
                key={bottomIndex}
                className={`tooltip ${showTooltips ? "active" : ""} ${hoveredItemIndex === bottomIndex ? "highlighted" : ""}`}
                style={{ 
                  position: 'absolute',
                  top: position ? `${position.top}px` : '0px',
                  left: position ? `${position.left}px` : '0px',
                  zIndex: 1000
                }}
              >
                {item.text}
              </div>
            );
          })}
        </>
      )}
      </nav>
      
      {/* Отладочная панель */}
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        minWidth: '250px',
        maxWidth: '300px',
        pointerEvents: 'none',
        border: '1px solid #333',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#4CAF50' }}>
          🔧 Sidebar4 Debug Info
        </div>
        <div style={{ marginBottom: '5px' }}>
          <span style={{ color: '#FFC107' }}>Tooltips:</span> {showTooltips ? '✅' : '❌'}
        </div>
        <div style={{ marginBottom: '5px' }}>
          <span style={{ color: '#FFC107' }}>Hovered Item:</span> {hoveredItemIndex !== null ? hoveredItemIndex : 'none'}
        </div>
        <div style={{ marginBottom: '5px' }}>
          <span style={{ color: '#FFC107' }}>Quick Return:</span> {isQuickReturn ? '✅' : '❌'}
        </div>
        <div style={{ marginBottom: '5px' }}>
          <span style={{ color: '#FFC107' }}>Floating Button:</span> {showFloatingButton ? '✅' : '❌'}
        </div>
        <div style={{ marginBottom: '5px' }}>
          <span style={{ color: '#FFC107' }}>Pinned:</span> {isPinned ? '✅' : '❌'}
        </div>
        <div style={{ marginBottom: '5px' }}>
          <span style={{ color: '#FFC107' }}>Tooltip Delay Timer:</span> {tooltipDelayTimer.current ? '⏳' : '❌'}
        </div>
        <div style={{ marginBottom: '5px' }}>
          <span style={{ color: '#FFC107' }}>Quick Return Timer:</span> {quickReturnTimer.current ? '⏳' : '❌'}
        </div>
      </div>
    </>
  );
};

export default Sidebar4;
