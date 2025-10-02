import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import KoobiqIcon from "./KoobiqIcon";
import "./Sidebar.css";

// Компонент логотипа
const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 25.6C0 28.4045 0 29.9635 1.01826 30.9817C2.03651 32 3.59554 32 6.4 32H25.6C28.4045 32 29.9635 32 30.9817 30.9817C32 29.9635 32 28.4045 32 25.6V6.4C32 3.59554 32 2.03651 30.9817 1.01826C29.9635 0 28.4045 0 25.6 0H6.4C3.59554 0 2.03651 0 1.01826 1.01826C0 2.03651 0 3.59554 0 6.4V25.6Z"
      fill="#FF0000"
    />
    <path
      d="M14.9773 16.0001L11.1933 19.7842L7.40916 16.0001L11.1933 12.2671L14.9773 16.0001ZM19.7842 20.858L16.0512 24.591L12.2671 20.858L16.0512 17.074L19.7842 20.858ZM19.7842 11.1933L16.0512 14.9262L12.2671 11.1933L16.0512 7.40918L19.7842 11.1933ZM24.591 16.0001L20.858 19.7842L17.1251 16.0001L20.858 12.2671L24.591 16.0001Z"
      fill="white"
    />
  </svg>
);

const menuItems = [
  { icon: "dashboard", text: "Дашборды", href: "#home", id: "home" },
  { icon: "shield-exclamation", text: "Инциденты", href: "#profile", id: "profile" },
  { icon: "calendar-days-o", text: "События", href: "#settings", id: "settings" },
  { icon: "desktop", text: "Активы", href: "#analytics", id: "analytics" },
  { icon: "scroll-o", text: "Отчеты", href: "#messages", id: "messages" },
  { icon: "box-archive-arrow-down", text: "Экспертиза", href: "#documents", id: "documents" },
  { icon: "briefcase", text: "Задачи", href: "#calendar", id: "calendar" },
];

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
    </nav>
  );
};

export default Sidebar;
