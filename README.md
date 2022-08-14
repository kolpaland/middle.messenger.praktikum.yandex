
## Проектная работа 2-го спринта "Чат"

Ссылка на [Pull Request Sprint 2](https://github.com/kolpaland/middle.messenger.praktikum.yandex/pull/10). 

Проектная работа выполнена согласно перечня заданий из [ТЗ Яндекс Практикума для 2-го спринта](https://practicum.yandex.ru/learn/middle-frontend/courses/631c1205-d8df-4662-821e-bb83fcbf51da/sprints/35756/topics/0c2e40db-e6ab-4834-9ece-c8392ccca510/lessons/badfe7fe-b562-4628-a2e6-c9ecbfca14f3/), за исключением пунктов: **4**, **5**, **6** и **9**. 

Наработки по этим пунктам сделаны только на странице чата: _`/chat`_. Страница _**PageChat**_ и элемент _**Input**_ наследуются от класса _**Block**_. Добавлена валидация не пустого поля _message_ по событиям `'focus'` и `'blur'` (пока просто пишется сообщение в консоль).

>ВАЖНО! Нужна обратная связь, понимание, так ли делать дальше, с остальными страницами.

Страница чата сверстана пока только условно. За образец взяты [макеты Яндекс Практикума](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1). Соответствие пока минимальное, ставка на реализацию заданий, связанных с TypeScript и MVC. 

К существующим страницам добавлена страница чата.

Страницы:

* Авторизация
* Регистрация
* Настройки пользователя
* Страницы 404 и 500
* Страница чата

Добавлены классы _Block_, _EventBus_ и _HttpTransport_ для работы с запросами, лежат в папке `src/utils`. _HttpTransport_ пока не используется.

Используется шаблонизатор Handlebars.

Сборщик - Parcel.

Для стилей подключен препроцессор Sass.

В проекте подключены TypeScript, ESLint, Stylelint.

Настроен Express сервер на 3000 порту.

Ссылка на [домен из Netlify](https://bucolic-trifle-cf1296.netlify.app/).

## Сборка и запуск

- `npm run dev` — запуск сервера для разработки,
- `npm run build` — сборка проекта,
- `npm run start` — запуск сервера, перед стартом следует выполнить сборку.

## Примеры использования

Результат выполнения команды: 

`npm run start`

`> middle.messenger.praktikum.yandex@1.0.0 start`

`> node src/server.js`

`Example app listening at http://localhost:3000`

При открытии ссылки доступны следующие страницы:

    '/login'
    '/signin'
    '/error'
    '/chat'
    '/profile'
    '/changeprofile'
    '/password'
    '/'

## Разработчик

Черепкова Екатерина с помощью наставника @Nikolay Eliseev и сокурсников из Slack.

