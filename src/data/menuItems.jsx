// Единый источник данных для всех навбаров
export const menuItems = [
  { icon: "dashboard", text: "Дашборды", href: "#home", id: "home" },
  { icon: "shield-exclamation", text: "Инциденты", href: "#incidents", id: "incidents" },
  { icon: "calendar-days-o", text: "События", href: "#events", id: "events" },
  { icon: "desktop", text: "Активы", href: "#assets", id: "assets" },
  { icon: "scroll-o", text: "Отчеты", href: "#reports", id: "reports" },
  { icon: "box-archive-arrow-down", text: "Экспертиза", href: "#packages", id: "packages" },
  { icon: "briefcase", text: "Задачи", href: "#issues", id: "issues" },
];

// Нижний блок пунктов меню
export const bottomMenuItems = [
  { icon: "bell", text: "Уведомления", href: "#notifications", id: "notifications" },
  { icon: "gear", text: "Настройки", href: "#settings", id: "settings" },
  { icon: "user", text: "Профиль", href: "#profile", id: "profile" },
];

// Компонент логотипа (также общий для всех навбаров)
export const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="logo-svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 25.6C0 28.4045 0 29.9635 1.01826 30.9817C2.03651 32 3.59554 32 6.4 32H25.6C28.4045 32 29.9635 32 30.9817 30.9817C32 29.9635 32 28.4045 32 25.6V6.4C32 3.59554 32 2.03651 30.9817 1.01826C29.9635 0 28.4045 0 25.6 0H6.4C3.59554 0 2.03651 0 1.01826 1.01826C0 2.03651 0 3.59554 0 6.4V25.6Z"
      fill="#FF0000"
    />
    <path
      className="diamond diamond-1"
      d="M14.9773 16.0001L11.1933 19.7842L7.40916 16.0001L11.1933 12.2671L14.9773 16.0001Z"
      fill="white"
    />
    <path
      className="diamond diamond-2"
      d="M19.7842 20.858L16.0512 24.591L12.2671 20.858L16.0512 17.074L19.7842 20.858Z"
      fill="white"
    />
    <path
      className="diamond diamond-3"
      d="M19.7842 11.1933L16.0512 14.9262L12.2671 11.1933L16.0512 7.40918L19.7842 11.1933Z"
      fill="white"
    />
    <path
      className="diamond diamond-4"
      d="M24.591 16.0001L20.858 19.7842L17.1251 16.0001L20.858 12.2671L24.591 16.0001Z"
      fill="white"
    />
  </svg>
);
