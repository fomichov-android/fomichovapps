# FomichovApps — Official Android Developer Website (Late-2026 Edition)

Официальный двуязычный сайт-витрина (`EN` + `UA`) для Android-приложений разработчика **Maksym Fomichov** (Developer ID: `5082361350201276993`).

## Что реализовано в этой сборке:
1. **Полная двуязычность (`EN` / `UA`)**:
   - Добавлена главная страница на английском языке (`/en/index.html`) со сравнительной таблицей всех 7 приложений, карточками, блоком об авторе и FAQ.
   - Корневой `/index.html` автоматически определяет язык браузера посетителя (`uk`/`ru` → `/uk/`, остальные → `/en/`) и сохраняет выбор пользователя.
2. **SEO + GEO / AIO (Оптимизация под ИИ-ботов и поисковики конца 2026 года)**:
   - В корне сайта добавлены `/llms.txt` и `/llms-full.txt` — специализированные базы знаний в формате Markdown для ИИ-ассистентов (`ChatGPT Search`, `Perplexity`, `Google AI Overviews / Gemini`, `Claude`, `Copilot`).
   - В `/robots.txt` открыт доступ для всех ключевых поисковых и ИИ-краулеров (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Googlebot`, `Bingbot`).
   - На каждой странице внедрена расширенная микроразметка `Schema.org` JSON-LD (`@graph`: `SoftwareApplication`, `Person`, `BreadcrumbList`, `FAQPage`), двусторонние теги `hreflang` (`en`, `uk`, `x-default`), `canonical`, `Open Graph` и `Twitter Cards`.
   - Обновлен `/sitemap.xml` с языковыми альтернативами `xhtml:link rel="alternate" hreflang`.
3. **Комфортный для глаз дизайн (Eye-Comfort) и улучшенная мобильная версия**:
   - Смягчена контрастность темной темы (устранен эффект «выжигания глаз» на OLED-экранах) и добавлен переключатель **🌙 Темная / ☀️ Мягкая светлая тема** в шапке каждой страницы.
   - На мобильных экранах добавлена **фиксированная нижняя панель быстрой установки (Sticky Mobile CTA Bar)** и **горизонтальная свайп-карусель скриншотов**, чтобы страницу не приходилось бесконечно прокручивать.
4. **Единый юридический центр (Google Play Data Safety Compliant)**:
   - `/legal/privacy-policy.html` (UA) и `/legal/privacy-policy-en.html` (EN) — единая политика конфиденциальности для всех 7 приложений с таблицей Data Safety и прямыми якорями (`#mover-erp`, `#linear-cutting`, `#margin-pro`, `#expense-sheet`, `#price-comparator`, `#get-it`, `#super-loto`).
   - `/legal/terms.html` (UA) и `/legal/terms-en.html` (EN) — единые условия использования.
   - `/legal/data-deletion.html` (UA) и `/legal/data-deletion-en.html` (EN) — инструкции по удалению локальных и облачных данных.
5. **Автоматическое подключение домена и Google Analytics 4**:
   - Все настройки вынесены в `/assets/js/site-core.js` и скрипт `/update-domain.py`.
