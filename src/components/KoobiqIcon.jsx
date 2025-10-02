import React from 'react';

/**
 * Компонент для отображения иконок из @koobiq/icons через CSS классы
 * @param {string} name - название иконки без расширения (например, "house")
 * @param {string} className - дополнительные CSS классы
 * @param {number} size - размер иконки (16 или 24)
 */
const KoobiqIcon = ({ name, className = '', size = 24, ...props }) => {
  // Формируем CSS класс для иконки
  const iconClass = `kbq kbq-${name}_${size}`;
  
  return (
    <i 
      className={`${iconClass} ${className}`}
      {...props}
    />
  );
};

export default KoobiqIcon;
