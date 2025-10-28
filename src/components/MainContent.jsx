import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebarContext } from '../contexts/SidebarContext';
import { useSidebar4Debug } from '../contexts/Sidebar4DebugContext';
import { useSidebar5Debug } from '../contexts/Sidebar5DebugContext';
import Topbar from './Topbar';
import './MainContent.css';

const MainContent = ({ onSidebarChange, currentSidebar }) => {
  const { isPinned, isHovered } = useSidebarContext();
  const location = useLocation();
  
  // Получаем отладочную информацию для Sidebar4 и Sidebar5
  let debugInfo = null;
  try {
    if (currentSidebar === 'sidebar4') {
      const { debugInfo: sidebar4DebugInfo } = useSidebar4Debug();
      debugInfo = sidebar4DebugInfo;
    } else if (currentSidebar === 'sidebar5') {
      const { debugInfo: sidebar5DebugInfo } = useSidebar5Debug();
      debugInfo = sidebar5DebugInfo;
    }
  } catch (error) {
    // Контекст недоступен для других сайдбаров - это нормально
  }

  return (
    <main className={`main-content ${isPinned ? 'pinned' : ''} ${isHovered && !isPinned ? 'hovered' : ''}`}>
      <Topbar />
      
      {/* Отладочная панель для Sidebar4 и Sidebar5 */}
      {(currentSidebar === 'sidebar4' || currentSidebar === 'sidebar5') && debugInfo && (
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
            🔧 {currentSidebar === 'sidebar4' ? 'Sidebar4' : 'Sidebar5'} Debug Info
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
            to="/sidebar2"
            className={`nav-button ${location.pathname === '/sidebar2' ? 'active' : ''}`}
          >
            Сайдбар 1
          </Link>
          <Link 
            to="/sidebar4"
            className={`nav-button ${location.pathname === '/sidebar4' ? 'active' : ''}`}
          >
            Сайдбар 2
          </Link>
          <Link 
            to="/sidebar6"
            className={`nav-button ${location.pathname === '/sidebar6' ? 'active' : ''}`}
          >
            Сайдбар 3
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
              <h3>Сайдбар 1</h3>
              <p>Версия с явной шапкой и стабильной зоной управления: слева переключатель приложений, справа — кнопка закрепить/свернуть; ниже — логотип и название приложения.</p>
              <ul>
                <li>Шапка: bento-кнопка слева; кнопка «закрепить/свернуть» в правом верхнем углу.</li>
                <li>Логотип и название приложения находятся на второй строке и не совмещены с кнопками.</li>
                <li>Меню: иконка + текст; активный пункт подсвечивается, клики меняют активное состояние.</li>
                <li>Сворачивание: в незакрепленном режиме сайдбар узкий; при наведении расширяется. Закрепление фиксирует расширенную ширину.</li>
                <li>Нижний блок: дополнительные пункты вынесены в отдельный список внизу.</li>
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
          ) : currentSidebar === 'sidebar4' ? (
            <div>
              <h3>Сайдбар 2</h3>
              <p>Специальная версия с tooltips и плавающими кнопками. В свернутом состоянии панель не расширяется по hover — показываются контекстные подсказки.</p>
              <ul>
                <li>Свернутый навбар не разворачивается по hover</li>
                <li>Подсказки показываются справа от пункта и фиксируются по его центру</li>
                <li>Первая подсказка появляется с задержкой ~700 мс; быстрый возврат (≤200 мс) — мгновенно</li>
                <li>Плавающая кнопка «Развернуть» на свернутом и «Свернуть» на развернутом меню появляются при наведении</li>
                <li>В развернутом состоянии подсказки не показываются</li>
                <li>Отладочная панель скрыта</li>
              </ul>
            </div>
          ) : currentSidebar === 'sidebar5' ? (
            <div>
              <h3>Сайдбар 5</h3>
              <p>Копия четвертого навбара с теми же функциями tooltips и floating кнопок.</p>
              <ul>
                <li>Свернутый навбар не разворачивается по hover</li>
                <li>При наведении на элементы показываются всплывающие подсказки справа</li>
                <li>Floating кнопка "Развернуть" появляется по hover на свернутое меню</li>
                <li>Floating кнопка "Свернуть" появляется по hover на развернутое меню</li>
                <li>В развернутом виде подсказки при наведении не показываются</li>
              </ul>
            </div>
          ) : (
            <div>
              <h3>Сайдбар 3</h3>
              <p>Компактный сайдбар с умными тултипами и плавающими кнопками управления.</p>
              <ul>
                <li>Тултипы только в свернутом состоянии; показываются по наведению на пункт</li>
                <li>Первая подсказка — с задержкой ~400 мс; последующие в течение 2 с — мгновенно</li>
                <li>Плавная анимация появления/скрытия тултипов (opacity + лёгкий сдвиг)</li>
                <li>Кнопки «Развернуть/Свернуть» появляются по hover на сайдбар и по фокусу</li>
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
