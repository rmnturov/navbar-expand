import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import KoobiqIcon from "./KoobiqIcon";
import { menuItems, bottomMenuItems, Logo } from "../data/menuItems.jsx";
import "./Sidebar.css";

const Sidebar = () => {
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

  const handleItemClick = (index) => {
    setActiveMenuItem(index);
  };

  return (
    <nav
      className={`sidebar ${isPinned ? "pinned" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-header">
        <button className="appswitcher">
          <div className="appswitcher-inner">
            <div className="logo-section">
              <Logo className="logo" />
              <span className="app-name">App Name</span>
            </div>
            <div className="hint-section">
              <KoobiqIcon name="grid-squares" size={16} className="hint-icon" />
              <span className="hint-text">Все приложения</span>
            </div>
          </div>
        </button>

        <button
          className="pin-button-header"
          onClick={isPinned ? collapseMenu : togglePin}
          title={isPinned ? "Свернуть меню" : "Закрепить меню"}
        >
          <div className="icon-container">
            <KoobiqIcon 
              name="pin" 
              size={16} 
              className={`pin-icon ${isPinned ? "hidden" : "visible"}`}
            />
            <KoobiqIcon 
              name="chevron-double-left" 
              size={16} 
              className={`collapse-icon ${isPinned ? "visible" : "hidden"}`}
            />
          </div>
        </button>
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
                aria-current={activeItem === index ? "page" : undefined}
                title={item.text}
              >
                <div className="menu-link-inner">
                  <KoobiqIcon name={item.icon} size={16} className="menu-icon" />
                  <span className="menu-text">{item.text}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Нижний блок пунктов меню */}
      <ul className="sidebar-bottom-menu-list">
        {bottomMenuItems.map((item, index) => {
          const bottomIndex = menuItems.length + index;
          return (
            <li key={bottomIndex} className="menu-item">
              <a
                href={item.href}
                id={item.id}
                className={`menu-link ${activeItem === bottomIndex ? "active" : ""}`}
                onClick={() => handleItemClick(bottomIndex)}
                aria-current={activeItem === bottomIndex ? "page" : undefined}
                title={item.text}
              >
                <div className="menu-link-inner">
                  <KoobiqIcon name={item.icon} size={16} className="menu-icon" />
                  <span className="menu-text">{item.text}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
