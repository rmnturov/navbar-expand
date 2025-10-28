import React, { useRef, useState, useCallback } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import KoobiqIcon from "./KoobiqIcon";
import { menuItems, bottomMenuItems, Logo } from "../data/menuItems.jsx";
import "./Sidebar6.css";

const Sidebar6 = () => {
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

  // Tooltip timing logic
  const INITIAL_DELAY = 400; // ms
  const GRACE_PERIOD = 2000; // ms
  const CLOSE_DELAY = 120; // ms

  const [visibleTooltipId, setVisibleTooltipId] = useState(null);
  const lastShowTsRef = useRef(0);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const clearTimers = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const onItemEnter = useCallback((id) => {
    if (isPinned) return; // тултип только в свернутом состоянии
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    const now = Date.now();
    const withinGrace = now - lastShowTsRef.current <= GRACE_PERIOD;
    const delay = withinGrace ? 0 : INITIAL_DELAY;

    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = setTimeout(() => {
      setVisibleTooltipId(id);
      lastShowTsRef.current = Date.now();
    }, delay);
  }, [isPinned]);

  const onItemLeave = useCallback((id) => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      // Скрываем только если всё ещё показываем этот же тултип
      setVisibleTooltipId((current) => (current === id ? null : current));
    }, CLOSE_DELAY);
  }, []);

  const onItemFocus = useCallback((id) => {
    if (isPinned) return;
    clearTimers();
    setVisibleTooltipId(id);
    lastShowTsRef.current = Date.now();
  }, [isPinned]);

  const onItemBlur = useCallback((id) => {
    if (isPinned) return;
    clearTimers();
    // Небольшая задержка закрытия для стабильности
    closeTimerRef.current = setTimeout(() => {
      setVisibleTooltipId((current) => (current === id ? null : current));
    }, CLOSE_DELAY);
  }, [isPinned]);

  const handleItemClick = (index) => {
    setActiveMenuItem(index);
  };

  const handleExpandClick = () => {
    togglePin();
  };

  const handleCollapseClick = () => {
    collapseMenu();
  };

  return (
    <nav
      className={`sidebar6 ${isPinned ? "pinned" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar6-header">
        {/* Пункт меню "Все приложения" */}
        <div className="header-menu-item">
          <button
            className={`menu-link all-apps-menu ${visibleTooltipId === "all-apps" ? "show-tooltip" : ""}`}
            title="Все приложения"
            onMouseEnter={() => onItemEnter("all-apps")}
            onMouseLeave={() => onItemLeave("all-apps")}
            onFocus={() => onItemFocus("all-apps")}
            onBlur={() => onItemBlur("all-apps")}
          >
            <div className="menu-link-inner">
              <KoobiqIcon name="bento-menu" size={16} className="menu-icon" />
              <span className="menu-text">Все приложения</span>
            </div>
            {!isPinned && (
              <div className="tooltip">Все приложения</div>
            )}
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
                className={`menu-link ${activeItem === index ? "active" : ""} ${visibleTooltipId === item.id ? "show-tooltip" : ""}`}
                onClick={() => handleItemClick(index)}
                aria-current={activeItem === index ? "page" : undefined}
                onMouseEnter={() => onItemEnter(item.id)}
                onMouseLeave={() => onItemLeave(item.id)}
                onFocus={() => onItemFocus(item.id)}
                onBlur={() => onItemBlur(item.id)}
              >
                <div className="menu-link-inner">
                  <KoobiqIcon name={item.icon} size={16} className="menu-icon" />
                  <span className="menu-text">{item.text}</span>
                </div>
                {!isPinned && (
                  <div className="tooltip">{item.text}</div>
                )}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Нижний блок пунктов меню */}
      <ul className="sidebar6-bottom-menu-list">
        {bottomMenuItems.map((item, index) => {
          const bottomIndex = menuItems.length + index;
          return (
            <li key={bottomIndex} className="menu-item">
              <a
                href={item.href}
                id={item.id}
                className={`menu-link ${activeItem === bottomIndex ? "active" : ""} ${visibleTooltipId === item.id ? "show-tooltip" : ""}`}
                onClick={() => handleItemClick(bottomIndex)}
                aria-current={activeItem === bottomIndex ? "page" : undefined}
                onMouseEnter={() => onItemEnter(item.id)}
                onMouseLeave={() => onItemLeave(item.id)}
                onFocus={() => onItemFocus(item.id)}
                onBlur={() => onItemBlur(item.id)}
              >
                <div className="menu-link-inner">
                  <KoobiqIcon name={item.icon} size={16} className="menu-icon" />
                  <span className="menu-text">{item.text}</span>
                </div>
                {!isPinned && (
                  <div className="tooltip">{item.text}</div>
                )}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Floating кнопки */}
      {!isPinned && (
        <button
          className="floating-expand-button visible"
          onClick={handleExpandClick}
          title="Развернуть меню"
        >
          <KoobiqIcon name="chevron-double-right-s" size={16} />
        </button>
      )}

      {isPinned && (
        <button
          className="floating-collapse-button visible"
          onClick={handleCollapseClick}
          title="Свернуть меню"
        >
          <KoobiqIcon name="chevron-double-left-s" size={16} />
        </button>
      )}
    </nav>
  );
};

export default Sidebar6;


