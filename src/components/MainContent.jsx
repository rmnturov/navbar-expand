import React from 'react';
import { useSidebarContext } from '../contexts/SidebarContext';
import './MainContent.css';

const MainContent = () => {
  const { isPinned, isHovered } = useSidebarContext();

  return (
    <main className={`main-content ${isPinned ? 'pinned' : ''} ${isHovered && !isPinned ? 'hovered' : ''}`}>
      <header className="content-header">
        <h1>Добро пожаловать на сайт</h1>
        <p>Это пример вертикального меню с функцией разворачивания и закрепления</p>
      </header>
      
      <section className="content-section">
        <h2>Основной контент</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <div className="content-grid">
          <div className="content-card">
            <h3>Карточка 1</h3>
            <p>Описание первой карточки с полезной информацией.</p>
          </div>
          <div className="content-card">
            <h3>Карточка 2</h3>
            <p>Описание второй карточки с дополнительными данными.</p>
          </div>
          <div className="content-card">
            <h3>Карточка 3</h3>
            <p>Описание третьей карточки с важными сведениями.</p>
          </div>
        </div>
        
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
    </main>
  );
};

export default MainContent;
