# Next.js Small Biz Starter

Минимальный шаблон для сайтов малого бизнеса:
- **Next.js (App Router) + TypeScript**
- **Prisma + PostgreSQL**
- **TailwindCSS**
- **MVP-админка** с паролем из `.env`
- **Форма заявок** с записью в БД и опциональной email-нотификацией через Resend

## Быстрый старт

1) **Скачайте и распакуйте** проект.
2) Создайте файл `.env` на основе `.env.example` и заполните:
   - `DATABASE_URL` — строка подключения Postgres (Neon/Supabase/Railway).
   - `ADMIN_PASSWORD` — пароль для входа в /admin.
   - `ADMIN_SECRET` — любой длинный случайный текст (подпись cookie).
   - `RESEND_API_KEY` + `NOTIFY_EMAIL_TO` + `NOTIFY_EMAIL_FROM` — опционально, для писем.
3) Установите зависимости:
```bash
npm install
```
4) Примените схему БД и выполните сиды:
```bash
npm run db:push
npm run db:seed
```
5) Запустите локально:
```bash
npm run dev
```
6) Откройте:
- `http://localhost:3000` — сайт
- `http://localhost:3000/admin/login` — вход в админку (пароль из `.env`)

## Как это работает

### Архитектура
- **App Router**: страницы лежат в `src/app`. Рендер на сервере по умолчанию → отлично для SEO.
- **Prisma**: схема БД в `prisma/schema.prisma`. Клиент — `src/lib/prisma.ts`.
- **Tailwind**: базовая типографика и небольшая дизайн-система (`.btn`, `.card`, `.input`).
- **Админка**: простая защита паролем. Вход → серверный action устанавливает cookie. Middleware редиректит на `/admin/login` если нет cookie.
- **Форма заявки**: клиентская валидация (react-hook-form + zod), отправка в `/api/lead`, запись в БД, опциональная отправка письма через Resend.

### Основные сущности
- `SiteSetting`: название, описание, контакты — используются на главной и в футере.
- `Service`: карточки услуг (название, цена, описание, `featured` для главной).
- `Testimonial`: отзывы.
- `Lead`: заявки с формы (имя, email, сообщение, статус просмотрено/нет).

### Где что лежит
- **Страницы**: `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/contact/page.tsx`
- **API**: `src/app/api/lead/route.ts`
- **Админка**: `src/app/admin/*`
- **Стили**: `src/styles/globals.css`
- **Prisma**: `prisma/*`

### Продакшн и деплой
- Рекомендую деплой на **Vercel**:
  1) Создайте проект, подключите репозиторий.
  2) В **Environment Variables** добавьте переменные из `.env`.
  3) В **Build & Output** оставьте по умолчанию (Next.js).
  4) После первого деплоя выполните в CI/CD шаги (или локально, если используете managed DB):
     - `npm run db:push` (миграции)
     - `npm run db:seed` (опционально)
- Используйте **managed Postgres** (Neon/Supabase). Включите авто-бэкапы.

### Безопасность и развитие
- Текущий вход в админку — **MVP**. Для продакшна добавьте **NextAuth** с провайдером Email/OAuth и ролями.
- Поддержка загрузки изображений: подключите S3/R2 (например, uploadthing или собственные подпиcанные загрузки).
- Логи/ошибки: Sentry. Аптайм: UptimeRobot.
- Многоязычность: next-intl.
- Поиск: Meilisearch для каталога/блога.

## Частые команды
```bash
npm run dev      # локальная разработка
npm run build    # сборка
npm start        # запуск собранного
npm run db:push  # синхронизировать схему Prisma в БД
npm run db:seed  # первичные данные
```

Удачи! Если нужна версия с **NextAuth + роли**, **Directus headless CMS**, Stripe-платежами или полноценной файловой загрузкой — дай знать.
