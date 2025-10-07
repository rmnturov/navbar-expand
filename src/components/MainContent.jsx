import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebarContext } from '../contexts/SidebarContext';
import { useSidebar4Debug } from '../contexts/Sidebar4DebugContext';
import Topbar from './Topbar';
import './MainContent.css';

const MainContent = ({ onSidebarChange, currentSidebar }) => {
  const { isPinned, isHovered } = useSidebarContext();
  const location = useLocation();
  
  // Получаем отладочную информацию только для Sidebar4
  let debugInfo = null;
  try {
    const { debugInfo: sidebar4DebugInfo } = useSidebar4Debug();
    debugInfo = sidebar4DebugInfo;
  } catch (error) {
    // Контекст недоступен для других сайдбаров - это нормально
  }

  return (
    <main className={`main-content ${isPinned ? 'pinned' : ''} ${isHovered && !isPinned ? 'hovered' : ''}`}>
      <Topbar />
      
      {/* Отладочная панель для Sidebar4 */}
      {currentSidebar === 'sidebar4' && debugInfo && (
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
            <span style={{ color: '#FFC107' }}>Tooltips:</span> {debugInfo.showTooltips ? '✅' : '❌'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <span style={{ color: '#FFC107' }}>Hovered Item:</span> {debugInfo.hoveredItemIndex !== null ? debugInfo.hoveredItemIndex : 'none'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <span style={{ color: '#FFC107' }}>Quick Return:</span> {debugInfo.isQuickReturn ? '✅' : '❌'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <span style={{ color: '#FFC107' }}>Tooltip Delay:</span> {debugInfo.tooltipDelayActive ? '⏳' : '❌'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <span style={{ color: '#FFC107' }}>Quick Return Timer:</span> {debugInfo.quickReturnActive ? '⏳' : '❌'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <span style={{ color: '#FFC107' }}>Floating Button:</span> {debugInfo.showFloatingButton ? '✅' : '❌'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <span style={{ color: '#FFC107' }}>Pinned:</span> {debugInfo.isPinned ? '✅' : '❌'}
          </div>
          <div style={{ 
            marginTop: '10px', 
            padding: '5px', 
            background: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '4px',
            fontSize: '11px',
            wordBreak: 'break-all'
          }}>
            <span style={{ color: '#FFC107' }}>Last Action:</span> {debugInfo.lastAction}
          </div>
        </div>
      )}
      
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
            to="/sidebar2"
            className={`nav-button ${location.pathname === '/sidebar2' ? 'active' : ''}`}
          >
            Сайдбар 2
          </Link>
          <Link 
            to="/sidebar3"
            className={`nav-button ${location.pathname === '/sidebar3' ? 'active' : ''}`}
          >
            Сайдбар 3
          </Link>
          <Link 
            to="/sidebar4"
            className={`nav-button ${location.pathname === '/sidebar4' ? 'active' : ''}`}
          >
            Сайдбар 4
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
          ) : currentSidebar === 'sidebar3' ? (
            <div>
              <h3>Сайдбар 3</h3>
              <p>Упрощенная версия сайдбара без кнопок сверху. Кнопка закрепить/развернуть вынесена в отдельный пункт меню внизу сайдбара.</p>
              <ul>
                <li>Только логотип и название приложения в шапке</li>
                <li>Нет кнопок закрепить/развернуть сверху</li>
                <li>Пункт меню "Закрепить/Свернуть" внизу сайдбара с соответствующими иконками</li>
                <li>Оформлен как обычный пункт меню с текстовыми подписями</li>
              </ul>
            </div>
          ) : (
            <div>
              <h3>Сайдбар 4</h3>
              <p>Специальная версия с tooltips и floating кнопками. Свернутый навбар не разворачивается по hover, вместо этого показываются всплывающие подсказки.</p>
              <ul>
                <li>Свернутый навбар не разворачивается по hover</li>
                <li>При наведении на элементы показываются всплывающие подсказки справа</li>
                <li>Floating кнопка "Развернуть" появляется по hover на свернутое меню</li>
                <li>Floating кнопка "Свернуть" появляется по hover на развернутое меню</li>
                <li>В развернутом виде подсказки при наведении не показываются</li>
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
