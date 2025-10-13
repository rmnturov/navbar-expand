import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import KoobiqIcon from "./KoobiqIcon";
import { menuItems, bottomMenuItems, Logo } from "../data/menuItems.jsx";
import "./Sidebar3.css";

const Sidebar3 = () => {
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

  const handleTogglePin = () => {
    if (isPinned) {
      collapseMenu();
    } else {
      togglePin();
    }
  };

  return (
    <nav
      className={`sidebar3 ${isPinned ? "pinned" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar3-header">
        {/* Пункт меню "Все приложения" */}
        <div className="header-menu-item">
          <button className=" menu-link all-apps-menu">
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
                aria-current={activeItem === index ? "page" : undefined}
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
      <ul className="sidebar3-bottom-menu-list">
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

      {/* Пункт меню для развернуть/закрепить внизу */}
      <div className="bottom-menu">
        <div className="menu-item">
          <button
            className="menu-link toggle-pin-menu"
            onClick={handleTogglePin}
            title={isPinned ? "Свернуть меню" : "Закрепить меню"}
          >
            <div className="menu-link-inner">
              <KoobiqIcon 
                name={isPinned ? "chevron-double-left" : "chevron-double-right"} 
                size={16} 
                className="menu-icon" 
              />
              <span className="menu-text">
                {isPinned ? "Свернуть" : "Развернуть"}
              </span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar3;
