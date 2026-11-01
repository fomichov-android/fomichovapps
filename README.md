# FomichovApps — Official Android Developer Website (Late-2026 Edition)

Офіційний двомовний сайт-вітрина (`EN` + `UA`) для Android-додатків розробника **Maksym Fomichov** (Developer ID: `5082361350201276993`).

## Що реалізовано в цій збірці:
1. **Повна двомовність (`EN` / `UA`)**:
   - Додано головну сторінку англійською мовою (`/en/index.html`) із порівняльною таблицею всіх 7 додатків, картками, блоком про автора та FAQ.
   - Корневий `/index.html` автоматично визначає мову браузера відвідувача (`uk`/`ru` → `/uk/`, решта → `/en/`) та зберігає вибір користувача.
2. **SEO + GEO / AIO (Оптимізація під ШІ-боти та пошуковики кінця 2026 року)**:
   - У корені сайту додано `/llms.txt` та `/llms-full.txt` — спеціалізовані бази знань у форматі Markdown для ШІ-асистентів (`ChatGPT Search`, `Perplexity`, `Google AI Overviews / Gemini`, `Claude`, `Copilot`).
   - У `/robots.txt` відкрито доступ для всіх ключових пошукових та ШІ-краулерів (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Googlebot`, `Bingbot`).
   - На кожній сторінці впроваджено розширену мікророзмітку `Schema.org` JSON-LD (`@graph`: `SoftwareApplication`, `Person`, `BreadcrumbList`, `FAQPage`), двосторонні теги `hreflang` (`en`, `uk`, `x-default`), `canonical`, `Open Graph` и `Twitter Cards`.
   - Оновлено `/sitemap.xml` із мовними альтернативами `xhtml:link rel="alternate" hreflang`.
3. **Комфортний для очей дизайн (Eye-Comfort) та покращена мобільна версія**:
   - Пом'якшено контрастність темної теми (усунуто ефект «випалювання очей» на OLED-екранах) та додано перемикач 🌙 Темна / ☀️ М'яка світла тема у шапці кожної сторінки.
   - На мобільних екранах додано фіксовану нижню панель швидкого встановлення (Sticky Mobile CTA Bar) та горизонтальну свайп-карусель скріншотів, щоб сторінку не доводилося нескінченно прокручувати.
4. **Єдиний юридичний центр (Google Play Data Safety Compliant)**:
   - `/legal/privacy-policy.html` (UA) и `/legal/privacy-policy-en.html` (EN) — єдина політика конфіденційності для всіх 7 додатків із таблицею Data Safety та прямими якорями (`#mover-erp`, `#linear-cutting`, `#margin-pro`, `#expense-sheet`, `#price-comparator`, `#get-it`, `#super-loto`).
   - `/legal/terms.html` (UA) та `/legal/terms-en.html` (EN) — єдині умови використання.
   - `/legal/data-deletion.html` (UA) та `/legal/data-deletion-en.html` (EN) — інструкції з видалення локальних та хмарних даних.
5. **Автоматичне підключення домену та Google Analytics 4**:
   - Усі налаштування винесено до `/assets/js/site-core.js` та скрипту `/update-domain.py`.
