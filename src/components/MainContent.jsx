import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebarContext } from '../contexts/SidebarContext';
import Topbar from './Topbar';
import './MainContent.css';

const MainContent = ({ onSidebarChange, currentSidebar }) => {
  const { isPinned, isHovered } = useSidebarContext();
  const location = useLocation();

  return (
    <main className={`main-content ${isPinned ? 'pinned' : ''} ${isHovered && !isPinned ? 'hovered' : ''}`}>
      <Topbar />
      <div className="main-content-wrapper">
        
        
        <section className="content-section">
        
        <div className="page-navigation">
          <Link 
            to="/"
            className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
          >
            Сайдбар 1
          </Link>
          <Link 
            to="/bento-visible"
            className={`nav-button ${location.pathname === '/bento-visible' ? 'active' : ''}`}
          >
            Сайдбар 2
          </Link>
          <Link 
            to="/navbar"
            className={`nav-button ${location.pathname === '/navbar' ? 'active' : ''}`}
          >
            Навбар
          </Link>
        </div>

        <div className="page-description">
          {currentSidebar === 'old' ? (
            <div className="sidebar-description-old">
              <h3>Сайдбар 1</h3>
              <p>Сайдбар по умолчанию компактный. При наведении разворачивается. Его можно закрепить, и панель станет широкой, а у пунктов меню появятся подписи.</p>
              <ul>
                <li>Логотип совмещен с переключателем приложений</li>
                <li>Кнопка закрепить/свернуть не занимет дополнительное место по высоте</li>
                <li>Плавные анимации при разворачивании</li>
              </ul>
            </div>
          ) : currentSidebar === 'new' ? (
            <div>
              <h3>Сайдбар 2</h3>
              <p>В левом верхнем всегда видна кнопка переключения приложений, логотип и название приложения ни с чем не совмещены.</p>
              <ul>
                <li>Кнопка с иконкой bento в левом верхнем углу (переклюатель приложений). Положение совпадает с горизонтальным навбаром.</li>
                <li>Логотип и название ни с чем не совмещены</li>
                <li>Кнопка закрепить/свернуть остается в правом верхнем углу</li>
              </ul>
            </div>
          ) : (
            <div>
              <h3>Навбар</h3>
              <p>Новый навбар на основе NewSidebar с кнопкой закрепить/развернуть внизу меню с текстовыми подписями.</p>
              <ul>
                <li>Кнопка с иконкой bento в левом верхнем углу (переключатель приложений)</li>
                <li>Логотип и название ни с чем не совмещены</li>
                <li>Кнопка закрепить/свернуть расположена внизу меню как отдельный пункт</li>
                <li>Кнопка имеет текстовые подписи "Закрепить" / "Свернуть"</li>
                <li>Плавные анимации при разворачивании</li>
              </ul>
            </div>
          )}
        </div>
        
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
      </div>
    </main>
  );
};

export default MainContent;
