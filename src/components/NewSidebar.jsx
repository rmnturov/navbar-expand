import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import KoobiqIcon from "./KoobiqIcon";
import { menuItems, bottomMenuItems, Logo } from "../data/menuItems.jsx";
import "./NewSidebar.css";

const NewSidebar = () => {
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
      className={`new-sidebar ${isPinned ? "pinned" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="new-sidebar-header">
        {/* Первая строка: кнопки слева и справа */}
        <div className="header-row-1">
          {/* Кнопка с grid-squares в левом углу */}
          <button className="grid-button">
            <div className="icon-container">
              <KoobiqIcon name="grid-squares" size={16} className="grid-icon" />
              <span className="grid-text">Все приложения</span>
            </div>
          </button>

          {/* Кнопка закрепить/свернуть в правом углу */}
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

        {/* Вторая строка: логотип и название приложения */}
        <div className="header-row-2">
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
      <ul className="new-sidebar-bottom-menu-list">
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

export default NewSidebar;
