# Инструкции по деплою на GitHub Pages

## Автоматический деплой (рекомендуется)

1. Убедитесь, что в настройках репозитория включен GitHub Pages:
   - Перейдите в Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

2. При каждом push в ветку `main` автоматически запускается GitHub Actions workflow, который:
   - Собирает проект
   - Деплоит в ветку `gh-pages`

## Ручной деплой

Если нужно задеплоить вручную:

```bash
npm run deploy
```

## URL маршруты

После деплоя сайт будет доступен по адресам:
- Главная страница: https://rmnturov.github.io/navbar-expand/
- Второй сайдбар: https://rmnturov.github.io/navbar-expand/#/bento-visible

## Технические детали

- Используется HashRouter для совместимости с GitHub Pages
- Настроен правильный base URL: `/navbar-expand/`
- Создан 404.html для редиректа SPA маршрутов
- GitHub Actions автоматически собирает и деплоит из папки `dist`
