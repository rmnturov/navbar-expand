# Гайд по использованию переменных Кубика (Koobiq Design Tokens)

## Содержание

1. [Введение](#введение)
2. [Установка и подключение](#установка-и-подключение)
3. [Группы переменных](#группы-переменных)
4. [Использование в CSS](#использование-в-css)
5. [Использование иконок](#использование-иконок)
6. [Структура файлов](#структура-файлов)
7. [Примеры использования](#примеры-использования)
8. [Лучшие практики](#лучшие-практики)
9. [Темизация](#темизация)

## Введение

Koobiq Design Tokens — это централизованная система дизайн-токенов, которая обеспечивает единообразие в дизайне и упрощает поддержку темной/светлой темы. Система включает в себя:

- **CSS Custom Properties** (переменные) для цветов, типографики, отступов и других стилей
- **Иконки** в формате веб-шрифта
- **Типографические стили** с предустановленными размерами и весами шрифтов
- **Темизация** с поддержкой светлой и темной тем
- **Адаптивность** для различных устройств и разрешений

> 📖 **Официальная документация**: [Обзор темизации в Koobiq](https://koobiq.io/ru/main/theming/overview)

## Установка и подключение

### 1. Установка пакетов

```bash
npm install @koobiq/design-tokens @koobiq/icons
```

### 2. Подключение в CSS

В главном CSS файле (например, `App.css` или `main.css`) добавьте импорты:

```css
/* Размеры, стили-маркдаун разметки, глобальная палитра цветов */
@import url("../node_modules/@koobiq/design-tokens/web/css-tokens.css");

/* Цвета светлой темы */
@import url("../node_modules/@koobiq/design-tokens/web/css-tokens-light.css");

/* Импорт темной темы (опционально) */
@import url("../node_modules/@koobiq/design-tokens/web/css-tokens-dark.css");

/* Импорт иконок */
@import url("../node_modules/@koobiq/icons/fonts/kbq-icons.css");
```

### 3. Подключение шрифтов

Для корректного отображения типографики необходимо подключить шрифты:

```css
/* Подключение основных шрифтов Koobiq */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
```

> 📖 **Подробнее о шрифтах**: [Добавление шрифтов в Koobiq](https://koobiq.io/ru/main/typography/overview#добавление-шрифтов)

### 4. Настройка базовых стилей

```css
body {
  color: var(--kbq-foreground-contrast);
  font-family: var(--kbq-typography-text-normal-font-family);
  background-color: var(--kbq-background-bg);
  font-size: var(--kbq-typography-text-normal-font-size);
  font-weight: var(--kbq-typography-text-normal-font-weight);
  line-height: var(--kbq-typography-text-normal-line-height);
}
```

## Группы переменных

> 📖 **Подробная документация**: [Обзор темизации в Koobiq](https://koobiq.io/ru/main/theming/overview)

> ⚠️ **Важно**: Многие переменные в системе Koobiq помечены как `DEPRECATED` (устаревшие). Это означает, что они будут удалены в будущих версиях. Рекомендуется использовать глобальные токены или сырые значения вместо компонентных токенов.

### Типы токенов в Koobiq

В системе Koobiq Design Tokens существует четыре основных типа токенов, каждый из которых отвечает за определенный аспект визуального оформления:

#### 1. **Background** - Фоновые токены

Используются для задания фоновых цветов различных элементов интерфейса:

- **Страницы** - основной фон приложения, страниц, областей
- **Элементов** - фон кнопок, карточек, блоков контента
- **Область** - фон сайдбаров, хедеров, футеров
- **Фон состояний** - фон при наведении, активации, выборе

#### 2. **Foreground**

Определяют цвета текста

#### 3. **Line**

Задают цвета границ и разделительных линий, рамки фокуса

#### 4. **Icon**

Определяют цвета иконок, которые могут отличаться от цвета текста

### Примеры использования типов токенов

```css
/* Пример: Карточка с использованием всех типов токенов */
.card {
  /* Background - фон карточки */
  background: var(--kbq-background-card);

  /* Line - граница карточки */
  border: 1px solid var(--kbq-line-contrast-less);

  /* Foreground - цвет заголовка */
  color: var(--kbq-foreground-contrast);

  padding: var(--kbq-size-l);
  border-radius: var(--kbq-size-border-radius);
}

.card h3 {
  /* Foreground - цвет заголовка */
  color: var(--kbq-foreground-contrast);
  margin-bottom: var(--kbq-size-s);
}

.card p {
  /* Foreground - цвет вторичного текста */
  color: var(--kbq-foreground-contrast-fade);
  margin-bottom: var(--kbq-size-s);
}

.card .icon {
  /* Icon - цвет иконки (может отличаться от текста) */
  color: var(--kbq-icon-contrast);
  margin-right: var(--kbq-size-xs);
}

.card:hover {
  /* Background - фон при наведении */
  background: var(--kbq-states-background-transparent-hover);

  /* Line - граница при наведении */
  border-color: var(--kbq-states-line-contrast-hover);
}

/* Пример: Кнопка с иконкой */
.button {
  /* Background - фон кнопки */
  background: var(--kbq-background-contrast);

  /* Line - граница кнопки */
  border: 1px solid var(--kbq-line-contrast);

  /* Foreground - цвет текста кнопки */
  color: var(--kbq-foreground-inverse);

  padding: var(--kbq-size-s) var(--kbq-size-l);
  border-radius: var(--kbq-size-border-radius);
}

.button .icon {
  /* Icon - цвет иконки в кнопке */
  color: var(--kbq-icon-contrast);
}

.button:hover {
  /* Background - фон при наведении */
  background: var(--kbq-states-background-contrast-hover);

  /* Line - граница при наведении */
  border-color: var(--kbq-states-line-contrast-hover);

  /* Icon - цвет иконки при наведении */
  color: var(--kbq-states-icon-contrast-hover);
}

/* Пример: Поле ввода */
.input {
  /* Background - фон поля ввода */
  background: var(--kbq-background-card);

  /* Line - граница поля ввода */
  border: 1px solid var(--kbq-line-contrast-fade);

  /* Foreground - цвет введенного текста */
  color: var(--kbq-foreground-contrast);

  padding: var(--kbq-size-s);
  border-radius: var(--kbq-size-border-radius);
}

.input::placeholder {
  /* Foreground - цвет плейсхолдера */
  color: var(--kbq-foreground-contrast-less);
}

.input:focus {
  /* Line - граница при фокусе */
  border-color: var(--kbq-states-line-focus);
  outline: none;
}

.input:focus + .icon {
  /* Icon - цвет иконки при фокусе */
  color: var(--kbq-states-icon-contrast-hover);
}
```

### Рекомендации по использованию типов токенов

1. **Background токены** - используйте для всех фоновых элементов:

   - Основной фон страницы: `--kbq-background-bg`
   - Фон боковой колонки или другой отдельной крупной области внутри или рядом с основным фоно: `--kbq-background-bg-secondary`
   - Для дополнительной вложенности поверх 'bg-secondary' `--kbq-background-bg-tartiary`
   - Фон карточек, вплывашек: `--kbq-background-card`

2. **Foreground токены** - применяйте для всех текстовых элементов:

   - Основной текст: `--kbq-foreground-contrast`
   - Вторичный текст: `--kbq-foreground-contrast-fade`
   - Плейсхолдеры: `--kbq-foreground-contrast-less`

3. **Line токены** - используйте для всех границ и разделителей:

   - Границы элементов в обычном состоянии: `--kbq-line-contrast-fade`
   - Разделители: `--kbq-line-contrast-less`
   - Фокус: `--kbq-states-line-focus`

4. **Консистентность** - всегда используйте соответствующие типы токенов:

   - Не смешивайте `foreground` и `icon` токены
   - Используйте `line` токены для всех границ
   - Применяйте `background` токены для всех фонов

5. **Состояния** - используйте соответствующие состояния для каждого типа:
   - `--kbq-states-background-*` для фоновых состояний
   - `--kbq-states-foreground-*` для текстовых состояний
   - `--kbq-states-line-*` для границ состояний
   - `--kbq-states-icon-*` для иконочных состояний

### Иерархия контрастности в Koobiq

**Правило**: `без суффикаса` > `fade` > `less`

В системе Koobiq используется четкая иерархия контрастности для цветов:

1. **Без суффикса** - максимальный контраст

   - `--kbq-background-contrast` - самый контрастный фон. Используется для primary-кнопок
   - `--kbq-foreground-contrast` - самый контрастный текст. Цвет основного текста.
   - `--kbq-line-contrast` - самые контрастные линии обводок

2. **`-fade`** - средний контраст, приглушенный

   - `--kbq-background-contrast-fade` - приглушенный нейтралный фон, используется в кнопках
   - `--kbq-foreground-contrast-fade` - второстепенный цвет текста
   - `--kbq-line-contrast-fade` - обводка полей ввода, элементов управления

3. **`-less`** - минимальный контраст
   - `--kbq-background-contrast-less` - фон отмеченной строки таблицы, опции в
   - `--kbq-foreground-contrast-less` - плейсхолдеры
   - `--kbq-line-contrast-less` - линии-разделители

### Паттерн именования состояний

Состояния в Koobiq следуют четкому паттерну именования:

```
--kbq-states-{тип}-{цвет}-{состояние}
```

**Где:**

- `{тип}` - тип элемента: `background`, `foreground`, `line`, `icon`
- `{цвет}` - цветовая группа: `contrast`, `theme`, `success`, `warning`, `error` (с суффиксами `-fade`, `-less`)
- `{состояние}` - состояние: `hover`, `active`, `focus`, `selected`

**Примеры:**

- `--kbq-states-background-contrast-hover` - фон primary-контролов при наведении
- `--kbq-states-foreground-theme-fade-active` - приглушенный акцентный текст при активации
- `--kbq-states-line-success-hover` - линия успеха при наведении
- `--kbq-states-icon-contrast-fade-active` - приглушенная контрастная иконка при активации

**Исключения:**

- `--kbq-states-line-focus` - линия фокуса (без цвета)
- `--kbq-states-line-hover` - линия при наведении (без цвета)
- `--kbq-opacity-disabled` - прозрачность для отключенных элементов

### Основные группы переменных:

1. **Глобальные токены** - основные переменные для цветов, размеров, типографики
2. **Компонентные токены** - специфичные для компонентов (помечены как DEPRECATED)
3. **Палитра цветов** - базовые цвета с различными оттенками
4. **Типографика** - шрифты, размеры, веса для различных элементов

### 1. Цвета и группы переменных

#### Фоновые цвета (Background)

```css
--kbq-background-bg                    /* Основной фон приложения */
--kbq-background-bg-secondary          /* Вторичный фон */
--kbq-background-bg-tertiary           /* Третичный фон */
--kbq-background-card                  /* Фон карточек */
--kbq-background-overlay               /* Фон оверлеев */
--kbq-background-contrast              /* Контрастный фон, для primary-контролов */
--kbq-background-contrast-fade         /* Приглушенный фон нейтральных контролов и алертов */
--kbq-background-contrast-less         /* Отмеченная чекбоксом опция или строка таблицы */
--kbq-background-theme                 /* Акцентный фон контролов */
--kbq-background-theme-fade            /* акцентный фон алертов, бледных кнопок */
--kbq-background-theme-less            /* Фон выбранной (активной) строки таблицы */
--kbq-background-transparent          /* Фон элемента, у которого появится бледная нейтральная заливка по ховеру */
```

#### Цвета текста (Foreground)

```css
--kbq-foreground-contrast              /* Основной текст */
--kbq-foreground-contrast-fade         /* Второстепенный текст (менее контрастный), подсказки */
--kbq-foreground-contrast-less         /* Тонкий текст (еще менее контрастный) */
--kbq-foreground-inverse               /* Инверсный текст */
```

#### Цвета иконок (Icon)

```css
--kbq-icon-contrast                    /* Контрастные иконки */
--kbq-icon-contrast-fade               /* Приглушенные иконки (менее контрастные) */
--kbq-icon-theme-fade                  /* Тематические иконки (приглушенные) */
```

#### Линии и границы (Line)

```css
--kbq-line-contrast                    /* Контрастные линии */
--kbq-line-contrast-fade               /* Приглушенные линии (менее контрастные) */
--kbq-line-contrast-less               /* Тонкие линии (еще менее контрастные) */
```

#### Тени

```css
--kbq-shadow-card       /* карточки */
--kbq-shadow-popup      /* дропдауны, поповеры */
--kbq-shadow-overlay    /*модалки, боковые панели */
```

#### Семантические цвета (Semantic)

> **Семантические цвета** - это цвета с определенным смыслом, которые помогают пользователям понимать состояние и назначение элементов интерфейса.

Не используйте для создания новых компонентов и страницы, они не поддерживют переключениие на темную тему. Их можно использовать, например, чтобы переназначить акцентную палитру в прилодении.

```css
/* Основные семантические цвета */
--kbq-contrast                         /* Черные элементы, primary-контролы */
--kbq-theme                           /* Акцентный цвет, цвет бренда, цвет гиперссылок */
--kbq-success                         /* Успех, что-то положительное */
--kbq-warning                         /* Предупреждение */
--kbq-error                           /* Ошибка, негативный повод */
--kbq-visited                         /* Посещенные ссылки */

/* Семантические фоны с разными уровнями контраста */
--kbq-background-contrast             /* Фон primary-контролов */
--kbq-background-contrast-fade        /* Приглушенный фон primary-контролов */
--kbq-background-contrast-less        /* Тонкий фон primary-контролов */

--kbq-background-theme                /* Фон акцентных элементов */
--kbq-background-theme-fade           /* Приглушенный фон акцентных элементов */
--kbq-background-theme-less           /* Тонкий фон акцентных элементов */

--kbq-background-success              /* Фон успеха */
--kbq-background-success-fade         /* Приглушенный фон успеха */
--kbq-background-success-less         /* Тонкий фон успеха */

--kbq-background-warning              /* Фон предупреждения */
--kbq-background-warning-fade         /* Приглушенный фон предупреждения */
--kbq-background-warning-less         /* Тонкий фон предупреждения */

--kbq-background-error                /* Фон ошибки */
--kbq-background-error-fade           /* Приглушенный фон ошибки */
--kbq-background-error-less           /* Тонкий фон ошибки */

/* Семантические цвета текста */
--kbq-foreground-contrast             /* Основной текст (черный) */
--kbq-foreground-contrast-fade        /* Вторичный текст */
--kbq-foreground-contrast-less        /* Плейсхолдеры */

--kbq-foreground-theme                /* Акцентный текст, ссылки */
--kbq-foreground-theme-fade           /* Приглушенные ссылки */
--kbq-foreground-theme-less           /* Тонкие акцентные элементы */

--kbq-foreground-success              /* Текст успеха */
--kbq-foreground-success-fade         /* Приглушенный текст успеха */
--kbq-foreground-success-less         /* Тонкий текст успеха */

--kbq-foreground-warning              /* Текст предупреждения */
--kbq-foreground-warning-fade         /* Приглушенный текст предупреждения */
--kbq-foreground-warning-less         /* Тонкий текст предупреждения */

--kbq-foreground-error                /* Текст ошибки */
--kbq-foreground-error-fade           /* Приглушенный текст ошибки */
--kbq-foreground-error-less           /* Тонкий текст ошибки */

--kbq-foreground-visited              /* Посещенные ссылки */

/* Семантические цвета линий */
--kbq-line-contrast                   /* Основные линии, границы */
--kbq-line-contrast-fade              /* Обводка полей ввода */
--kbq-line-contrast-less              /* Линии-разделители */

--kbq-line-theme                      /* Акцентные линии */
--kbq-line-theme-fade                 /* Приглушенные акцентные линии */
--kbq-line-theme-less                 /* Тонкие акцентные линии */

--kbq-line-success                    /* Линии успеха */
--kbq-line-success-fade               /* Приглушенные линии успеха */
--kbq-line-success-less               /* Тонкие линии успеха */

--kbq-line-warning                    /* Линии предупреждения */
--kbq-line-warning-fade               /* Приглушенные линии предупреждения */
--kbq-line-warning-less               /* Тонкие линии предупреждения */

--kbq-line-error                      /* Линии ошибки */
--kbq-line-error-fade                 /* Приглушенные линии ошибки */
--kbq-line-error-less                 /* Тонкие линии ошибки */

/* Семантические цвета иконок */
--kbq-icon-contrast                   /* Основные иконки */
--kbq-icon-contrast-fade              /* Приглушенные иконки */
--kbq-icon-contrast-less              /* Тонкие иконки */

--kbq-icon-theme                      /* Акцентные иконки */
--kbq-icon-theme-fade                 /* Приглушенные акцентные иконки */
--kbq-icon-theme-less                 /* Тонкие акцентные иконки */

--kbq-icon-success                    /* Иконки успеха */
--kbq-icon-success-fade               /* Приглушенные иконки успеха */
--kbq-icon-success-less               /* Тонкие иконки успеха */

--kbq-icon-warning                    /* Иконки предупреждения */
--kbq-icon-warning-fade               /* Приглушенные иконки предупреждения */
--kbq-icon-warning-less               /* Тонкие иконки предупреждения */

--kbq-icon-error                      /* Иконки ошибки */
--kbq-icon-error-fade                 /* Приглушенные иконки ошибки */
--kbq-icon-error-less                 /* Тонкие иконки ошибки */
```

### Назначение семантических цветов:

- **`contrast`** - черные элементы, primary-контролы (кнопки, активные элементы)
- **`theme`** - акцентный цвет, цвет бренда, цвет гиперссылок
- **`error`** - ошибка, негативный повод (ошибки валидации, критические сообщения)
- **`warning`** - предупреждение (предупреждающие сообщения, уведомления)
- **`success`** - успех, что-то положительное (успешные операции, подтверждения)
- **`visited`** - посещенные ссылки (для навигации и истории)

### Рекомендации по использованию семантических цветов:

1. **Primary-контролы** - используйте `contrast` для основных действий (кнопки, активные элементы)
2. **Акцентные элементы** - используйте `theme` для ссылок, брендинга, вторичных действий
3. **Состояния системы** - используйте `success`, `warning`, `error` для соответствующих сообщений
4. **Навигация** - используйте `visited` для отображения посещенных ссылок
5. **Консистентность** - всегда используйте соответствующие суффиксы (`-fade`, `-less`) для разных уровней контрастности
6. **Доступность** - убедитесь, что цвета обеспечивают достаточный контраст для читаемости

### 2. Состояния (States)

> **Важно**: Цвета состояний хранятся в группе `states` и следуют паттерну `--kbq-states-{тип}-{цвет}-{состояние}`

#### Фоновые состояния (Background States)

```css
/* Прозрачные состояния */
--kbq-states-background-transparent-hover    /* Фон при наведении */
--kbq-states-background-transparent-active   /* Фон при активации */
--kbq-states-background-transparent-selected /* Фон при выборе */

/* Состояния для контрастных фонов */
--kbq-states-background-contrast-hover       /* Контрастный фон при наведении */
--kbq-states-background-contrast-active      /* Контрастный фон при активации */
--kbq-states-background-contrast-fade-hover  /* Приглушенный контрастный фон при наведении */
--kbq-states-background-contrast-fade-active /* Приглушенный контрастный фон при активации */
--kbq-states-background-contrast-less-hover  /* Тонкий контрастный фон при наведении */
--kbq-states-background-contrast-less-active /* Тонкий контрастный фон при активации */

/* Состояния для тематических фонов */
--kbq-states-background-theme-hover          /* акцентный фон при наведении */
--kbq-states-background-theme-active         /* акцентный фон при активации */
--kbq-states-background-theme-fade-hover     /* Приглушенный акцентный фон при наведении */
--kbq-states-background-theme-fade-active    /* Приглушенный акцентный фон при активации */
--kbq-states-background-theme-less-hover     /* Тонкий акцентный фон при наведении */
--kbq-states-background-theme-less-active    /* Тонкий акцентный фон при активации */

/* Состояния для семантических фонов */
--kbq-states-background-success-hover        /* Фон успеха при наведении */
--kbq-states-background-success-active       /* Фон успеха при активации */
--kbq-states-background-warning-hover        /* Фон предупреждения при наведении */
--kbq-states-background-warning-active       /* Фон предупреждения при активации */
--kbq-states-background-error-hover          /* Фон ошибки при наведении */
--kbq-states-background-error-active         /* Фон ошибки при активации */
```

#### Состояния текста (Foreground States)

```css
--kbq-states-foreground-contrast-hover       /* Контрастный текст при наведении */
--kbq-states-foreground-contrast-active      /* Контрастный текст при активации */
--kbq-states-foreground-contrast-fade-hover  /* Приглушенный текст при наведении */
--kbq-states-foreground-contrast-fade-active /* Приглушенный текст при активации */
```

#### Состояния линий (Line States)

```css
--kbq-states-line-focus                       /* Линия фокуса */
--kbq-states-line-hover                       /* Линия при наведении */
--kbq-states-line-contrast-hover              /* Контрастная линия при наведении */
--kbq-states-line-contrast-active             /* Контрастная линия при активации */
--kbq-states-line-theme-hover                 /* Тематическая линия при наведении */
--kbq-states-line-theme-active                /* Тематическая линия при активации */
```

#### Состояния иконок (Icon States)

```css
--kbq-states-icon-contrast-hover              /* Контрастная иконка при наведении */
--kbq-states-icon-contrast-active             /* Контрастная иконка при активации */
--kbq-states-icon-contrast-fade-hover         /* Приглушенная иконка при наведении */
--kbq-states-icon-contrast-fade-active        /* Приглушенная иконка при активации */
--kbq-states-icon-theme-hover                 /* Тематическая иконка при наведении */
--kbq-states-icon-theme-active                /* Тематическая иконка при активации */
```

#### Отключенные состояния (Disabled States)

```css
--kbq-opacity-disabled                        /* Прозрачность для отключенных элементов */
```

> **Как использовать disabled состояния**: Для стилизации отключенных элементов используйте токен `--kbq-opacity-disabled`. Берем нормальное состояние и делаем его полупрозрачным:
>
> ```css
> .button:disabled {
>   opacity: var(--kbq-opacity-disabled);
>   /* Остальные стили остаются как у обычной кнопки */
> }
> ```

### 3. Тени (Shadows)

```css
--kbq-shadow-sm                        /* Маленькая тень */
--kbq-shadow-md                        /* Средняя тень */
--kbq-shadow-lg                        /* Большая тень */
--kbq-shadow-popup                     /* Тень для попапов */
```

### 4. Скроллбары (Scrollbar)

```css
--kbq-scrollbar-thumb-default-background      /* Фон ползунка скроллбара */
--kbq-scrollbar-thumb-hover-background        /* Фон ползунка при наведении */
```

### 5. Типографика (Typography)

> 📖 **Подробная документация**: [Добавление шрифтов в Koobiq](https://koobiq.io/ru/main/typography/overview#добавление-шрифтов)

#### Семейства шрифтов

```css
--kbq-font-family-base                 /* Основное семейство шрифтов (Inter) */
--kbq-font-family-accent               /* Акцентное семейство для заголовоков (TT-Positive) */
--kbq-font-family-mono                 /* Моноширинный шрифт (JetBrains Mono) */
```

#### Markdown типографика

Применяется только для статей, когда длинный текст. Не применяется для интерфейсов.

```css
--kbq-md-typography-md-h1-font-size    /* H1 размер (36px) */
--kbq-md-typography-md-h2-font-size    /* H2 размер (24px) */
--kbq-md-typography-md-h3-font-size    /* H3 размер (20px) */
--kbq-md-typography-md-h4-font-size    /* H4 размер (18px) */
--kbq-md-typography-md-h5-font-size    /* H5 размер (16px) */
--kbq-md-typography-md-h6-font-size    /* H6 размер (14px) */
--kbq-md-typography-md-body-font-size  /* Основной текст (16px) */
--kbq-md-typography-md-caption-font-size /* Подпись (14px) */
```

#### Компонентная типографика

```css
--kbq-typography-headline-font-size    /* Заголовок (28px) */
--kbq-typography-title-font-size       /* Заголовок (20px) */
--kbq-typography-subheading-font-size  /* Подзаголовок (18px) */
--kbq-typography-display-big-font-size /* Большой дисплей (57px) */
--kbq-typography-display-normal-font-size /* Обычный дисплей (45px) */
```

### 6. Размеры (Sizing)

```css
/* Базовые размеры */
--kbq-size-3xs                         /* 2px */
--kbq-size-xxs                         /* 4px */
--kbq-size-xs                          /* 6px */
--kbq-size-s                           /* 8px */
--kbq-size-m                           /* 12px */
--kbq-size-l                           /* 16px */
--kbq-size-xl                          /* 20px */
--kbq-size-xxl                         /* 24px */
--kbq-size-3xl                         /* 32px */
--kbq-size-4xl                         /* 40px */
--kbq-size-5xl                         /* 48px */
--kbq-size-6xl                         /* 56px */
--kbq-size-7xl                         /* 64px */

/* Специальные размеры */
--kbq-size-border-width                /* Ширина границы (1px) */
--kbq-size-border-radius               /* Радиус скругления (8px) */
```

### 7. Палитра цветов (Palette)

Не используется при создании интерфейсов, служит только референсами для токенов темы.

```css
/* Черные оттенки */
--kbq-palette-black-default            /* Основной черный */
--kbq-palette-black-a5                 /* Черный с прозрачностью 5% */
--kbq-palette-black-default-a8         /* Черный с прозрачностью 8% */
--kbq-palette-black-default-a16        /* Черный с прозрачностью 16% */
--kbq-palette-black-default-a20        /* Черный с прозрачностью 20% */
--kbq-palette-black-default-a50        /* Черный с прозрачностью 50% */

/* Белые оттенки */
--kbq-palette-white-default            /* Основной белый */

/* Синие оттенки (0-100) */
--kbq-palette-blue-0                   /* Синий 0% */
--kbq-palette-blue-50                  /* Синий 50% */
--kbq-palette-blue-100                 /* Синий 100% */
```

## Использование в CSS

### Базовые примеры

```css
/* Карточка */
.card {
  background-color: var(--kbq-background-card);
  border: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  border-radius: var(--kbq-size-border-radius);
  padding: var(--kbq-size-l);
  box-shadow: var(--kbq-shadow-sm);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--kbq-shadow-md);
  border-color: var(--kbq-line-contrast);
}

/* Кнопка */
.button {
  background-color: var(--kbq-button-background-default);
  color: var(--kbq-button-foreground-default);
  border: none;
  border-radius: var(--kbq-size-border-radius);
  padding: var(--kbq-size-s) var(--kbq-size-xxl);
  font-size: var(--kbq-md-typography-md-body-font-size);
  font-weight: var(--kbq-md-typography-md-body-font-weight);
  font-family: var(--kbq-font-family-base);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: var(--kbq-size-3xl);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button:hover {
  background-color: var(--kbq-states-background-transparent-hover);
  transform: translateY(-1px);
  box-shadow: var(--kbq-shadow-sm);
}

.button:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Текст */
.heading {
  color: var(--kbq-foreground-contrast);
  font-size: var(--kbq-typography-headline-font-size);
  font-weight: var(--kbq-typography-headline-font-weight);
  font-family: var(--kbq-font-family-accent);
  line-height: var(--kbq-typography-headline-line-height);
}

.subtitle {
  color: var(--kbq-foreground-muted);
  font-size: var(--kbq-md-typography-md-body-font-size);
  font-family: var(--kbq-font-family-base);
  line-height: var(--kbq-md-typography-md-body-line-height);
}
```

### Состояния и интерактивность

```css
/* Интерактивные элементы */
.interactive-element {
  background-color: transparent;
  border: 1px solid var(--kbq-line-contrast-less);
  color: var(--kbq-foreground-contrast);
  transition: all 0.2s ease;
}

.interactive-element:hover {
  background-color: var(--kbq-states-background-transparent-hover);
  border-color: var(--kbq-line-contrast);
}

.interactive-element:active {
  background-color: var(--kbq-states-background-transparent-active);
}

.interactive-element:focus-visible {
  outline: 2px solid var(--kbq-states-line-focus);
  outline-offset: 2px;
}

/* Отключенное состояние */
.interactive-element:disabled {
  opacity: var(--kbq-states-opacity-disabled);
  cursor: not-allowed;
}
```

## Использование иконок

### 1. Подключение иконок

Иконки подключаются через CSS-классы. Каждая иконка имеет формат: `kbq kbq-{название}_{размер}`

### 2. Компонент для иконок

```jsx
import React from "react";

const KoobiqIcon = ({ name, className = "", size = 24, ...props }) => {
  const iconClass = `kbq kbq-${name}_${size}`;

  return <i className={`${iconClass} ${className}`} {...props} />;
};

export default KoobiqIcon;
```

### 3. Использование в компонентах

```jsx
// Базовое использование
<KoobiqIcon name="house" size={16} />

// С дополнительными классами
<KoobiqIcon
  name="search"
  size={24}
  className="search-icon"
/>

// В кнопке
<button className="button">
  <KoobiqIcon name="plus" size={16} />
  Добавить
</button>
```

### 4. Стилизация иконок

```css
.icon {
  color: var(--kbq-icon-contrast);
  transition: color 0.2s ease;
}

.icon:hover {
  color: var(--kbq-icon-contrast-fade);
}

/* Иконка в кнопке */
.button .icon {
  margin-right: 8px;
}
```

### 5. Доступные иконки

Основные иконки, используемые в проекте:

- `dashboard` - дашборд
- `shield-exclamation` - инциденты
- `calendar-days-o` - события
- `desktop` - активы
- `scroll-o` - отчеты
- `box-archive-arrow-down` - экспертиза
- `briefcase` - задачи
- `search` - поиск
- `bell` - уведомления
- `gear` - настройки
- `user` - пользователь
- `chevron-down` - стрелка вниз
- `pin` - закрепить
- `chevron-double-left` - свернуть
- `grid-squares` - сетка

## Структура файлов

### Основные файлы проекта

```
src/
├── App.css                    # Главный CSS файл с импортами токенов
├── App.jsx                    # Главный компонент приложения
├── components/
│   ├── KoobiqIcon.jsx         # Компонент для иконок
│   ├── NewSidebar.jsx         # Новый сайдбар
│   ├── NewSidebar.css         # Стили сайдбара с токенами
│   ├── Topbar.jsx             # Верхняя панель
│   ├── Topbar.css             # Стили топбара с токенами
│   ├── MainContent.jsx        # Основной контент
│   └── MainContent.css        # Стили контента с токенами
└── contexts/
    └── SidebarContext.jsx     # Контекст для управления сайдбаром
```

### Назначение файлов

#### `App.css`

- Импорт всех токенов Koobiq
- Базовые стили для body и приложения
- Утилитарные классы
- Стили для доступности

#### `NewSidebar.css`

- Стили для боковой панели навигации
- Использование токенов для цветов, отступов, анимаций
- Адаптивное поведение при наведении и закреплении

#### `Topbar.css`

- Стили для верхней панели
- Поиск, уведомления, профиль пользователя
- Адаптивный дизайн

#### `MainContent.css`

- Стили для основного контента
- Карточки, сетки, типографика
- Адаптация под состояние сайдбара

## Примеры использования

### 1. Создание карточки

```css
.content-card {
  background: var(--kbq-background-card);
  border-radius: var(--kbq-size-border-radius);
  border: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  padding: var(--kbq-size-xxl);
  transition: all 0.2s ease;
  box-shadow: var(--kbq-shadow-sm);
  margin-bottom: var(--kbq-size-l);
}

.content-card:hover {
  box-shadow: var(--kbq-shadow-md);
  border-color: var(--kbq-line-contrast-fade);
  transform: translateY(-2px);
}

/* Примеры карточек с разными уровнями контрастности */
.card-high-contrast {
  background: var(--kbq-background-contrast);
  border-color: var(--kbq-line-contrast);
}

.card-medium-contrast {
  background: var(--kbq-background-contrast-fade);
  border-color: var(--kbq-line-contrast-fade);
}

.card-low-contrast {
  background: var(--kbq-background-contrast-less);
  border-color: var(--kbq-line-contrast-less);
}

.content-card h3 {
  font-size: var(--kbq-md-typography-md-h4-font-size);
  font-weight: var(--kbq-md-typography-md-h4-font-weight);
  font-family: var(--kbq-font-family-accent);
  margin-bottom: var(--kbq-size-s);
  color: var(--kbq-foreground-contrast);
}
```

### 2. Создание кнопки

> **Пример использования состояний**: Для каждого типа элемента (фон, текст, линии, иконки) есть соответствующие состояния в группе `states`

```css
.nav-button {
  padding: var(--kbq-size-s) var(--kbq-size-xxl);
  border: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  border-radius: var(--kbq-size-border-radius);
  background: var(--kbq-background-card);
  color: var(--kbq-foreground-contrast);
  font-size: var(--kbq-md-typography-md-body-font-size);
  font-weight: var(--kbq-md-typography-md-body-font-weight);
  font-family: var(--kbq-font-family-base);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: var(--kbq-size-3xl);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--kbq-size-xxs);
}

/* Примеры кнопок с разными уровнями контрастности */
.button-primary {
  background: var(--kbq-background-theme);
  border-color: var(--kbq-line-theme);
  color: var(--kbq-foreground-inverse);
}

.button-secondary {
  background: var(--kbq-background-theme-fade);
  border-color: var(--kbq-line-theme-fade);
  color: var(--kbq-foreground-contrast);
}

.button-ghost {
  background: var(--kbq-background-theme-less);
  border-color: var(--kbq-line-theme-less);
  color: var(--kbq-foreground-contrast-fade);
}

.nav-button:hover {
  background: var(--kbq-states-background-transparent-hover);
  border-color: var(--kbq-states-line-contrast-hover);
  transform: translateY(-1px);
  box-shadow: var(--kbq-shadow-sm);
}

.nav-button:active {
  background: var(--kbq-states-background-transparent-active);
  border-color: var(--kbq-states-line-contrast-active);
  transform: translateY(0);
}

.nav-button:disabled {
  opacity: var(--kbq-opacity-disabled);
  cursor: not-allowed;
  transform: none;
}

.nav-button.active {
  background: var(--kbq-states-background-transparent-active);
  border-color: var(--kbq-line-contrast);
  box-shadow: var(--kbq-shadow-sm);
}

.nav-button:disabled {
  opacity: var(--kbq-opacity-disabled);
  cursor: not-allowed;
  transform: none;
}
```

### 3. Использование состояний для разных типов элементов

```css
/* Пример: Кнопка с иконкой */
.button-with-icon {
  background: var(--kbq-background-contrast);
  color: var(--kbq-foreground-contrast);
  border: 1px solid var(--kbq-line-contrast);
  padding: var(--kbq-size-s) var(--kbq-size-l);
}

.button-with-icon:hover {
  background: var(--kbq-states-background-contrast-hover);
  color: var(--kbq-states-foreground-contrast-hover);
  border-color: var(--kbq-states-line-contrast-hover);
}

.button-with-icon:active {
  background: var(--kbq-states-background-contrast-active);
  color: var(--kbq-states-foreground-contrast-active);
  border-color: var(--kbq-states-line-contrast-active);
}

.button-with-icon:disabled {
  opacity: var(--kbq-opacity-disabled);
  cursor: not-allowed;
}

/* Пример: Ссылка с иконкой */
.link-with-icon {
  color: var(--kbq-foreground-contrast);
  text-decoration: none;
}

.link-with-icon:hover {
  color: var(--kbq-states-foreground-contrast-hover);
}

.link-with-icon:active {
  color: var(--kbq-states-foreground-contrast-active);
}

.link-with-icon:disabled {
  opacity: var(--kbq-opacity-disabled);
  cursor: not-allowed;
}

/* Пример: Поле ввода */
.input-field {
  background: var(--kbq-background-card);
  border: 1px solid var(--kbq-line-contrast-less);
  color: var(--kbq-foreground-contrast);
  padding: var(--kbq-size-s);
}

.input-field:focus {
  border-color: var(--kbq-states-line-focus);
  outline: none;
}

.input-field:hover {
  border-color: var(--kbq-states-line-hover);
}

.input-field:disabled {
  opacity: var(--kbq-opacity-disabled);
  cursor: not-allowed;
}
```

### 4. Использование семантических цветов

```css
/* Primary кнопка (основное действие) */
.btn-primary {
  background: var(--kbq-background-contrast);
  color: var(--kbq-foreground-inverse);
  border: 1px solid var(--kbq-line-contrast);
}

.btn-primary:hover {
  background: var(--kbq-states-background-contrast-hover);
  border-color: var(--kbq-states-line-contrast-hover);
}

/* Акцентная кнопка (вторичное действие) */
.btn-accent {
  background: var(--kbq-background-theme);
  color: var(--kbq-foreground-inverse);
  border: 1px solid var(--kbq-line-theme);
}

.btn-accent:hover {
  background: var(--kbq-states-background-theme-hover);
  border-color: var(--kbq-states-line-theme-hover);
}

/* Ссылки */
.link {
  color: var(--kbq-foreground-theme);
  text-decoration: none;
}

.link:hover {
  color: var(--kbq-states-foreground-theme-hover);
}

.link:visited {
  color: var(--kbq-foreground-visited);
}

/* Сообщения об успехе */
.message-success {
  background: var(--kbq-background-success-less);
  color: var(--kbq-foreground-success);
  border: 1px solid var(--kbq-line-success-fade);
  padding: var(--kbq-size-s);
  border-radius: var(--kbq-size-border-radius);
}

.message-success .icon {
  color: var(--kbq-icon-success);
}

/* Предупреждения */
.message-warning {
  background: var(--kbq-background-warning-less);
  color: var(--kbq-foreground-warning);
  border: 1px solid var(--kbq-line-warning-fade);
  padding: var(--kbq-size-s);
  border-radius: var(--kbq-size-border-radius);
}

.message-warning .icon {
  color: var(--kbq-icon-warning);
}

/* Ошибки */
.message-error {
  background: var(--kbq-background-error-less);
  color: var(--kbq-foreground-error);
  border: 1px solid var(--kbq-line-error-fade);
  padding: var(--kbq-size-s);
  border-radius: var(--kbq-size-border-radius);
}

.message-error .icon {
  color: var(--kbq-icon-error);
}

/* Поле ввода с ошибкой */
.input-error {
  border-color: var(--kbq-line-error);
  background: var(--kbq-background-error-less);
}

.input-error:focus {
  border-color: var(--kbq-states-line-error-hover);
  outline: 2px solid var(--kbq-line-error-fade);
}

/* Поле ввода с успехом */
.input-success {
  border-color: var(--kbq-line-success);
  background: var(--kbq-background-success-less);
}

.input-success:focus {
  border-color: var(--kbq-states-line-success-hover);
  outline: 2px solid var(--kbq-line-success-fade);
}
```

### 5. Создание формы

```css
.form-input {
  width: 100%;
  padding: var(--kbq-size-s) var(--kbq-size-l);
  border: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  border-radius: var(--kbq-size-border-radius);
  background-color: var(--kbq-background-card);
  color: var(--kbq-foreground-contrast);
  font-size: var(--kbq-md-typography-md-body-font-size);
  font-family: var(--kbq-font-family-base);
  transition: all 0.2s ease;
  min-height: var(--kbq-size-3xl);
}

.form-input:focus {
  outline: none;
  border-color: var(--kbq-line-contrast);
  box-shadow: 0 0 0 2px var(--kbq-states-background-transparent-hover);
}

.form-input:focus-visible {
  outline: 2px solid var(--kbq-states-line-focus);
  outline-offset: 2px;
}

.form-input::placeholder {
  color: var(--kbq-foreground-muted);
}

.form-input:disabled {
  opacity: var(--kbq-opacity-disabled);
  cursor: not-allowed;
  background-color: var(--kbq-background-bg-secondary);
}
```

### 4. Создание навигационного меню

```css
.menu-link {
  display: flex;
  align-items: center;
  padding: var(--kbq-size-s) var(--kbq-size-l);
  border-radius: var(--kbq-size-border-radius);
  color: var(--kbq-foreground-muted);
  text-decoration: none;
  transition: all 0.2s ease;
  gap: var(--kbq-size-s);
  min-height: var(--kbq-size-3xl);
}

.menu-link:hover {
  background-color: var(--kbq-states-background-transparent-hover);
  color: var(--kbq-foreground-contrast);
  transform: translateX(2px);
}

.menu-link.active {
  background-color: var(--kbq-states-background-transparent-active);
  color: var(--kbq-foreground-contrast);
  box-shadow: var(--kbq-shadow-sm);
}

.menu-icon {
  color: var(--kbq-icon-contrast-fade);
  font-size: 16px;
  flex-shrink: 0;
}

.menu-link:hover .menu-icon {
  color: var(--kbq-icon-contrast);
}
```

### 5. Создание модального окна

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: var(--kbq-palette-black-default-a50);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--kbq-size-xxl);
}

.modal {
  background-color: var(--kbq-background-card);
  border-radius: var(--kbq-size-border-radius);
  box-shadow: var(--kbq-shadow-lg);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
}

.modal-header {
  padding: var(--kbq-size-xxl);
  border-bottom: var(--kbq-size-border-width) solid var(
      --kbq-line-contrast-less
    );
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: var(--kbq-typography-title-font-size);
  font-weight: var(--kbq-typography-title-font-weight);
  font-family: var(--kbq-font-family-accent);
  color: var(--kbq-foreground-contrast);
  margin: 0;
}

.modal-body {
  padding: var(--kbq-size-xxl);
}

.modal-footer {
  padding: var(--kbq-size-xxl);
  border-top: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  display: flex;
  gap: var(--kbq-size-s);
  justify-content: flex-end;
}
```

### 6. Создание уведомлений

```css
.notification {
  position: fixed;
  top: var(--kbq-size-xxl);
  right: var(--kbq-size-xxl);
  background-color: var(--kbq-background-card);
  border: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  border-radius: var(--kbq-size-border-radius);
  box-shadow: var(--kbq-shadow-lg);
  padding: var(--kbq-size-l);
  max-width: 400px;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  gap: var(--kbq-size-s);
}

.notification.success {
  border-left: 4px solid var(--kbq-success);
}

.notification.error {
  border-left: 4px solid var(--kbq-error);
}

.notification.warning {
  border-left: 4px solid var(--kbq-warning);
}

.notification.info {
  border-left: 4px solid var(--kbq-contrast);
}

.notification-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-size: var(--kbq-md-typography-md-body-font-size);
  font-weight: var(--kbq-md-typography-md-h4-font-weight);
  font-family: var(--kbq-font-family-base);
  color: var(--kbq-foreground-contrast);
  margin: 0 0 var(--kbq-size-xxs) 0;
}

.notification-message {
  font-size: var(--kbq-md-typography-md-body-font-size);
  font-family: var(--kbq-font-family-base);
  color: var(--kbq-foreground-muted);
  margin: 0;
  line-height: var(--kbq-md-typography-md-body-line-height);
}
```

## Лучшие практики

### 1. Использование токенов

✅ **Правильно:**

```css
.button {
  background-color: var(--kbq-button-background-default);
  color: var(--kbq-button-foreground-default);
  border: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  padding: var(--kbq-size-s) var(--kbq-size-xxl);
  font-family: var(--kbq-font-family-base);
}
```

❌ **Неправильно:**

```css
.button {
  background-color: #007bff;
  color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 8px 24px;
  font-family: Arial, sans-serif;
}
```

### 2. Состояния элементов

✅ **Правильно:**

```css
.interactive-element {
  transition: all 0.2s ease;
}

.interactive-element:hover {
  background-color: var(--kbq-states-background-transparent-hover);
}

.interactive-element:focus-visible {
  outline: 2px solid var(--kbq-states-line-focus);
}

.interactive-element:disabled {
  opacity: var(--kbq-opacity-disabled);
}
```

### 3. Типографика

✅ **Правильно:**

```css
.heading {
  font-size: var(--kbq-typography-headline-font-size);
  font-weight: var(--kbq-typography-headline-font-weight);
  font-family: var(--kbq-font-family-accent);
  line-height: var(--kbq-typography-headline-line-height);
  color: var(--kbq-foreground-contrast);
}

.body-text {
  font-size: var(--kbq-md-typography-md-body-font-size);
  font-family: var(--kbq-font-family-base);
  line-height: var(--kbq-md-typography-md-body-line-height);
  color: var(--kbq-foreground-contrast);
}
```

### 4. Адаптивность

✅ **Правильно:**

```css
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: var(--kbq-size-l);
  }

  .topbar-content {
    padding: 0 var(--kbq-size-l);
  }

  .modal {
    margin: var(--kbq-size-l);
    max-width: calc(100% - var(--kbq-size-3xl));
  }
}
```

### 5. Доступность

✅ **Правильно:**

```css
/* Фокус только при навигации с клавиатуры */
button:focus-visible {
  outline: 2px solid var(--kbq-states-line-focus);
  outline-offset: 2px;
}

/* Убираем фокус при клике мышкой */
button:focus:not(:focus-visible) {
  outline: none;
}

/* Отключенное состояние - используем opacity для всех типов элементов */
button:disabled,
input:disabled,
.link:disabled {
  opacity: var(--kbq-opacity-disabled);
  cursor: not-allowed;
}

/* Правильное использование типов токенов */
.primary-button {
  /* Background - фон кнопки */
  background: var(--kbq-background-contrast);

  /* Foreground - цвет текста кнопки */
  color: var(--kbq-foreground-inverse);

  /* Line - граница кнопки */
  border: 1px solid var(--kbq-line-contrast);

  padding: var(--kbq-size-s) var(--kbq-size-l);
  border-radius: var(--kbq-size-border-radius);
}

.primary-button:hover {
  /* Background - фон при наведении */
  background: var(--kbq-states-background-contrast-hover);

  /* Line - граница при наведении */
  border-color: var(--kbq-states-line-contrast-hover);
}

.primary-button .icon {
  /* Icon - цвет иконки в кнопке */
  color: var(--kbq-icon-contrast);
}

.accent-button {
  /* Background - фон акцентной кнопки */
  background: var(--kbq-background-theme);

  /* Foreground - цвет текста акцентной кнопки */
  color: var(--kbq-foreground-inverse);

  /* Line - граница акцентной кнопки */
  border: 1px solid var(--kbq-line-theme);

  padding: var(--kbq-size-s) var(--kbq-size-l);
  border-radius: var(--kbq-size-border-radius);
}

.accent-button:hover {
  /* Background - фон при наведении */
  background: var(--kbq-states-background-theme-hover);

  /* Line - граница при наведении */
  border-color: var(--kbq-states-line-theme-hover);
}

.accent-button .icon {
  /* Icon - цвет иконки в акцентной кнопке */
  color: var(--kbq-icon-theme);
}

/* Семантические сообщения с правильным использованием типов токенов */
.success-message {
  /* Background - фон сообщения об успехе */
  background: var(--kbq-background-success-less);

  /* Foreground - цвет текста сообщения об успехе */
  color: var(--kbq-foreground-success);

  /* Line - граница сообщения об успехе */
  border: 1px solid var(--kbq-line-success-fade);

  padding: var(--kbq-size-s);
  border-radius: var(--kbq-size-border-radius);
}

.success-message .icon {
  /* Icon - цвет иконки успеха */
  color: var(--kbq-icon-success);
}

.warning-message {
  /* Background - фон предупреждения */
  background: var(--kbq-background-warning-less);

  /* Foreground - цвет текста предупреждения */
  color: var(--kbq-foreground-warning);

  /* Line - граница предупреждения */
  border: 1px solid var(--kbq-line-warning-fade);

  padding: var(--kbq-size-s);
  border-radius: var(--kbq-size-border-radius);
}

.warning-message .icon {
  /* Icon - цвет иконки предупреждения */
  color: var(--kbq-icon-warning);
}

.error-message {
  /* Background - фон сообщения об ошибке */
  background: var(--kbq-background-error-less);

  /* Foreground - цвет текста сообщения об ошибке */
  color: var(--kbq-foreground-error);

  /* Line - граница сообщения об ошибке */
  border: 1px solid var(--kbq-line-error-fade);

  padding: var(--kbq-size-s);
  border-radius: var(--kbq-size-border-radius);
}

.error-message .icon {
  /* Icon - цвет иконки ошибки */
  color: var(--kbq-icon-error);
}

/* Правильное использование типов токенов для текста */
.high-contrast-text {
  /* Foreground - основной контрастный текст */
  color: var(--kbq-foreground-contrast);
}

.muted-text {
  /* Foreground - приглушенный текст */
  color: var(--kbq-foreground-contrast-fade);
}

.low-contrast-text {
  /* Foreground - тонкий текст (плейсхолдеры) */
  color: var(--kbq-foreground-contrast-less);
}

/* Пример: Ссылка с правильным использованием типов токенов */
.link {
  /* Foreground - цвет ссылки */
  color: var(--kbq-foreground-theme);
  text-decoration: none;
}

.link:hover {
  /* Foreground - цвет ссылки при наведении */
  color: var(--kbq-states-foreground-theme-hover);
}

.link:visited {
  /* Foreground - цвет посещенной ссылки */
  color: var(--kbq-foreground-visited);
}

.link .icon {
  /* Icon - цвет иконки в ссылке */
  color: var(--kbq-icon-theme);
}
```

### 6. Производительность

✅ **Правильно:**

```css
/* Используйте will-change для анимируемых элементов */
.animated-element {
  will-change: transform, opacity;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/* Уважайте предпочтения пользователя */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}

/* Используйте CSS переменные для динамических значений */
.dynamic-element {
  background-color: var(--kbq-background-card);
  border-radius: var(--kbq-size-border-radius);
  padding: var(--kbq-size-l);
}
```

### 7. Организация CSS

✅ **Правильно:**

```css
/* Группируйте связанные стили */
/* ========================================
   Button Styles
   ======================================== */
.button {
  background-color: var(--kbq-button-background-default);
  color: var(--kbq-button-foreground-default);
  border: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  border-radius: var(--kbq-size-border-radius);
  padding: var(--kbq-size-s) var(--kbq-size-xxl);
  font-family: var(--kbq-font-family-base);
  transition: all 0.2s ease;
}

.button:hover {
  background-color: var(--kbq-states-background-transparent-hover);
  border-color: var(--kbq-line-contrast-fade);
}

.button:active {
  background-color: var(--kbq-states-background-transparent-active);
}

/* ========================================
   Form Styles  
   ======================================== */
.form-input {
  background-color: var(--kbq-background-card);
  border: var(--kbq-size-border-width) solid var(--kbq-line-contrast-less);
  border-radius: var(--kbq-size-border-radius);
  padding: var(--kbq-size-s) var(--kbq-size-l);
  font-family: var(--kbq-font-family-base);
  color: var(--kbq-foreground-contrast);
}
```

## Темизация

### Переключение тем

Koobiq поддерживает автоматическое переключение между светлой и темной темами:

```css
/* Автоматическое переключение на основе системных настроек */
@media (prefers-color-scheme: dark) {
  /* Темная тема применяется автоматически */
}

/* Ручное переключение через класс */
.theme-dark {
  /* Применение темной темы */
}
```

### Кастомизация тем

Вы можете переопределить токены для создания собственных тем:

```css
:root {
  /* Переопределение цветов для кастомной темы */
  --kbq-semantic-primary: #your-color;
  --kbq-background-bg: #your-background;
}
```

## Заключение

Система Koobiq Design Tokens обеспечивает:

- **Единообразие** дизайна во всем приложении
- **Легкость поддержки** и обновления стилей
- **Поддержку тем** (светлая/темная) с автоматическим переключением
- **Доступность** и семантичность
- **Производительность** и оптимизацию
- **Типографическую систему** с предустановленными шрифтами
- **Гибкую темизацию** с возможностью кастомизации

Используйте токены везде, где это возможно, и следуйте лучшим практикам для создания качественного и поддерживаемого кода.

## Поиск доступных переменных

### Как найти все доступные переменные:

1. **В файлах пакета:**

   ```bash
   # Просмотр всех переменных
   grep -r "\.kbq-" node_modules/@koobiq/design-tokens/web/

   # Поиск конкретной группы
   grep "\.kbq-size-" node_modules/@koobiq/design-tokens/web/css-tokens.css
   ```

2. **В браузере:**

   ```javascript
   // Получить все CSS переменные
   const styles = getComputedStyle(document.documentElement);
   const variables = [];
   for (let i = 0; i < styles.length; i++) {
     const prop = styles[i];
     if (prop.startsWith("--kbq-")) {
       variables.push(prop);
     }
   }
   console.log(variables);
   ```

3. **Основные файлы с переменными:**
   - `css-tokens.css` - основные токены
   - `css-tokens-light.css` - светлая тема
   - `css-tokens-dark.css` - темная тема
   - `css-tokens-font.css` - компонентные токены (DEPRECATED)

## Дополнительные ресурсы

- 📖 [Обзор темизации в Koobiq](https://koobiq.io/ru/main/theming/overview) - подробная документация по системе темизации
- 📖 [Добавление шрифтов в Koobiq](https://koobiq.io/ru/main/typography/overview#добавление-шрифтов) - руководство по работе с типографикой
- 🎨 [Официальный сайт Koobiq](https://koobiq.io) - полная документация и примеры
