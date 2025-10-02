import { useState, useEffect, useCallback, useRef } from 'react';

// Параметры таймингов для анимаций сайдбара
const TIMING_CONFIG = {
  // Задержка перед разворачиванием меню при наведении (мс)
  HOVER_EXPAND_DELAY: 300,
  
  // Задержка перед сворачиванием меню при уходе курсора (мс)
  // Значение 0 для мгновенного сворачивания
  HOVER_COLLAPSE_DELAY: 200
};

export const useSidebar = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);

  // Загружаем сохраненное состояние при инициализации
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarPinned');
    if (savedState === 'true') {
      setIsPinned(true);
    }
  }, []);

  // Сохраняем состояние при изменении
  useEffect(() => {
    localStorage.setItem('sidebarPinned', isPinned.toString());
  }, [isPinned]);

  // Очищаем таймеры при размонтировании компонента
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  const togglePin = useCallback(() => {
    setIsPinned(!isPinned);
    // При закреплении сбрасываем hover состояние
    if (!isPinned) {
      setIsHovered(false);
      // Очищаем все таймеры
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
    }
  }, [isPinned]);

  const collapseMenu = useCallback(() => {
    if (isPinned) {
      // Очищаем все таймеры для мгновенного сворачивания
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      
      // Мгновенное сворачивание
      setIsPinned(false);
      setIsHovered(false);
    }
  }, [isPinned]);

  // Обработка клавиатурных сокращений
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + B для переключения закрепления
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        togglePin();
      }
      
      // Escape для сворачивания закрепленного меню
      if (e.key === 'Escape' && isPinned) {
        collapseMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPinned, togglePin, collapseMenu]);

  const handleMouseEnter = useCallback(() => {
    // Если меню закреплено, не обрабатываем hover
    if (isPinned) return;
    
    // Очищаем таймер ухода, если он был установлен
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    // Устанавливаем задержку для разворачивания меню
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, TIMING_CONFIG.HOVER_EXPAND_DELAY);
  }, [isPinned]);

  const handleMouseLeave = useCallback(() => {
    // Если меню закреплено, не обрабатываем hover
    if (isPinned) return;
    
    // Очищаем таймер разворачивания, если он был установлен
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Устанавливаем задержку для сворачивания меню
    if (TIMING_CONFIG.HOVER_COLLAPSE_DELAY > 0) {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, TIMING_CONFIG.HOVER_COLLAPSE_DELAY);
    } else {
      // Мгновенное сворачивание при задержке = 0
      setIsHovered(false);
    }
  }, [isPinned]);

  const setActiveMenuItem = useCallback((index) => {
    setActiveItem(index);
  }, []);

  return {
    isPinned,
    isHovered,
    activeItem,
    togglePin,
    collapseMenu,
    handleMouseEnter,
    handleMouseLeave,
    setActiveMenuItem
  };
};
