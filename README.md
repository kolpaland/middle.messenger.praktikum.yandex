## Проектная работа 1-го спринта "Чат"

Ссылка на [Pull Request Sprint 1](). 

Проектная работа выполнена согласно перечня заданий из [ТЗ Яндекс Практикума](https://practicum.yandex.ru/learn/middle-frontend/courses/631c1205-d8df-4662-821e-bb83fcbf51da/sprints/35756/topics/84819896-6204-4ba5-bad6-a727bda24d65/lessons/7301f008-ecad-4b5c-803c-f95448372f43/).

За образец взяты [макеты Яндекс Практикума](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1). Соответствие пока минимальное, ставка на реализацию заданий, связанных с шаблонизатором и модулями. Добавлены перечисленные в ТЗ страницы:

* Авторизация
* Регистрация
* Настройки пользователя
* Страницы 404 и 500
* Заглушка для чата

Используется шаблонизатор Handlebars.

Сборщик - Parcel.

Для стилей подключен препроцессор Sass.

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

