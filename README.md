# KURGAN — каталог домашней еды 🥟🔥

![Vercel](https://img.shields.io/badge/Vercel-deployed-000?logo=vercel&logoColor=white)
![No build step](https://img.shields.io/badge/сборка-не_требуется-brightgreen)
![Vanilla JS](https://img.shields.io/badge/JS-vanilla-f7df1e?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/лицензия-нет-lightgrey)

> 🇬🇧 [English version below](#-english-version)

**KURGAN** — одностраничный сайт-каталог домашней еды с доставкой по Казани:
главная, каталог с фильтрацией по категориям и клиентская корзина. Чистые HTML +
CSS + JavaScript, без сборки и зависимостей.

🔗 **Демо:** [kirill-kurgan.vercel.app](https://kirill-kurgan.vercel.app)

## ✨ Возможности

- 🍽️ Каталог из 13 блюд с фото, описанием и ценой за килограмм
- 🧮 Фильтр по категориям: все / манты / хинкали / шашлык / баранина / свинина
- 🛒 Корзина с шагом веса 0,5 кг, пересчётом сумм и адаптивной мобильной панелью
- 💾 Сохранение корзины в localStorage (устойчиво к битым данным)
- 📱 Полностью адаптивная вёрстка: 5 → 3 → 2 колонки, мобильные хедер и панель корзины
- ♿️ ARIA-атрибуты, ленивая загрузка изображений, поддержка `prefers-reduced-motion`
- 📞 Кнопка «Оформить заказ» показывает телефон для связи вместо реального оформления

## 🧰 Стек

| Технология | Назначение |
| --- | --- |
| HTML | разметка двух страниц |
| CSS | стили, адаптив, анимации |
| JavaScript | данные каталога, фильтр, корзина |
| localStorage | сохранение корзины |
| Vercel | хостинг статикой + rewrite `/catalog` |

## 🚀 Быстрый старт

Сборка не нужна — это статический сайт.

**Вариант 1.** Просто откройте `index.html` в браузере.

**Вариант 2.** Локальный сервер (рекомендуется, т.к. ссылки ведут от корня):

```bash
npx serve .
# или
npx vercel dev
```

Затем откройте <http://localhost:3000> (каталог — <http://localhost:3000/catalog>).

## 📁 Структура проекта

```
kurgan-meat-catalog/
├── index.html      # главная: герой, доставка, футер
├── catalog.html    # страница каталога с фильтрами
├── script.js       # данные меню, корзина, обработчики
├── styles.css      # все стили и адаптив
├── vercel.json     # rewrite /catalog -> /catalog.html
└── assets/         # логотип и фото блюд (PNG)
```

## 📝 Примечания

- 🧪 **Корзина — демонстрационная.** Все данные живут только в браузере:
  бэкенда, оформления заказа и оплаты нет. «Оформить заказ» лишь показывает
  телефон для связи.
- Данные в localStorage валидируются при загрузке: неизвестные позиции и битый
  JSON безопасно отбрасываются.

## 👤 Автор

**Кирилл** — [GitHub](https://github.com/kirill-kzzkzok)

---

## 🇬🇧 English version

# KURGAN — Home Food Catalog

![Vercel](https://img.shields.io/badge/Vercel-deployed-000?logo=vercel&logoColor=white)
![No build step](https://img.shields.io/badge/build-none-brightgreen)
![Vanilla JS](https://img.shields.io/badge/JS-vanilla-f7df1e?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-none-lightgrey)

> 🇷🇺 [Русская версия выше](#-kurgan--каталог-домашней-еды-)

**KURGAN** is a static single-purpose site for a homemade food delivery service
in Kazan, Russia: a landing page, a product catalog with category filtering, and
a client-side shopping cart. Plain HTML + CSS + JavaScript — no build step, no
dependencies.

🔗 **Live demo:** [kirill-kurgan.vercel.app](https://kirill-kurgan.vercel.app)

## ✨ Features

- 🍽️ Catalog of 13 dishes with photos, descriptions and per-kilogram prices
- 🧮 Category filters: all / manti / khinkali / shashlik / lamb / pork
- 🛒 Cart with 0.5 kg weight steps, live totals and an adaptive mobile bar
- 💾 Cart persisted to localStorage (tolerates corrupted data)
- 📱 Fully responsive layout: 5 → 3 → 2 columns, mobile header and cart bar
- ♿️ ARIA attributes, lazy image loading, `prefers-reduced-motion` support
- 📞 The “Checkout” button reveals a contact phone instead of placing a real order

## 🧰 Stack

| Technology | Purpose |
| --- | --- |
| HTML | two-page markup |
| CSS | styles, responsiveness, animations |
| JavaScript | catalog data, filtering, cart |
| localStorage | cart persistence |
| Vercel | static hosting + `/catalog` rewrite |

## 🚀 Quick start

No build required — it is a static site.

**Option 1.** Open `index.html` in a browser.

**Option 2.** Serve locally (recommended, since links are root-based):

```bash
npx serve .
# or
npx vercel dev
```

Then open <http://localhost:3000> (catalog at <http://localhost:3000/catalog>).

## 📁 Project structure

```
kurgan-meat-catalog/
├── index.html      # home: hero, delivery, footer
├── catalog.html    # catalog page with filters
├── script.js       # menu data, cart, event handlers
├── styles.css      # all styles and responsive rules
├── vercel.json     # /catalog -> /catalog.html rewrite
└── assets/         # logo and dish photos (PNG)
```

## 📝 Notes

- 🧪 **The cart is a client-side demo.** Everything lives in the browser only:
  there is no backend, order placement or payment. “Checkout” simply reveals a
  contact phone number.
- localStorage data is validated on load: unknown items and corrupted JSON are
  safely discarded.

## 👤 Author

**Kirill** — [GitHub](https://github.com/kirill-kzzkzok)
