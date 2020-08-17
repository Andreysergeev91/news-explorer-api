# news-explorer-api v1.0.0

API для аутентификации пользователей и сохранения статей.

Публичный IP адрес: 84.201.154.226

Ниже приведены форматы HTTP запросов и ответов API, а также ответы сервера в случае ошибки.

## Форматы HTTP запросов и ответов API

1. #### Создание пользователя:

```html
POST https://api.news-explorer-app.ga/signup/
```
Тело запроса, JSON-объект, который должен содержать следующие поля:
```json
{
  "name":"имя",
  "email":"адрес электронной почты",
  "password":"пароль"
}
```
Тело ответа, JSON-объект:
```json
{
  "data": { 
            "_id":"id пользователя",
            "name":"имя",
            "email":"адрес электронной почты",
            "password":"пароль",
             "_v":0
          }
}
```
2. #### Авторизация:

```html
POST https://api.news-explorer-app.ga/signin/
```
Тело запроса, JSON-объект, который должен содержать следующие поля:
```json
{
  "email":"адрес электронной почты",
  "password":"пароль",
 }
```
При ответе генерируется токен и записывается в cookies, а также отправляется пользователю в теле ответа:
```json
{
  "token":"JSON Web токен"
}
```
3. #### Просмотр информации пользователя:

```html
GET https://api.news-explorer-app.ga/users/me
```
Тело ответа, JSON-объект:
```json
{
  "data":   {
             "name":"имя",
             "email":"адрес электронной почты",
            }
}
```
5. #### Создание статьи:

```html
POST https://api.news-explorer-app.ga/articles/
```
Тело запроса, JSON-объект, который должен содержать следующие поля:
```json
{
        "keyword":"ключевое слово",
        "title" : "заголовок статьи",
        "text" : "текст статьи",
        "date" : "дата статьи",
        "source": "источник статьи",
        "link" : "ссылка на статью",
        "image": "ссылка на иллюстрацию к статье",
        
 }
```
Тело ответа, JSON-объект:
```json
{
    "data": {
        "_id": "id статьи",
        "keyword": "ключевое слово",
        "title": "заголовок статьи",
        "text": "текст статьи",
        "date": "дата статьи",
        "source": "источник статьи",
        "link": "ссылка на статью",
        "image": "ссылка на иллюстрацию к статье",
        "owner": "id владельца статьи",
        "__v": 0
    }
}
```
6. #### Просмотр всех статей пользователя:

```html
GET https://api.news-explorer-app.ga/articles/
```
Тело ответа, JSON-объект с массивом статей пользователя:
```json
{
  "data":[
         {},
         {},
         {}
         ]
}
```
7. #### Удаление статьи:

Удалить статью может только тот пользователь, который её создал.

```html
DELETE https://api.news-explorer-app.ga/articles/:articleId
```
параметр articleId - "_id" конкретной статьи

Тело ответа, JSON-объект:
```json
{
    "data": {
        "_id": "id статьи",
        "keyword": "ключевое слово",
        "title": "заголовок статьи",
        "text": "текст статьи",
        "date": "дата статьи",
        "source": "источник статьи",
        "link": "ссылка на статью",
        "image": "ссылка на иллюстрацию к статье",
        "owner": "id владельца статьи",
        "__v": 0
 }
```
## Форматы ответов API в случае ошибки

1. **Код:** 404 Неправильный адрес  

   **Тело ответа:** `{ error : "Статья с данным Id не найдена" }` или 
  `{ error : "Запрашиваемый ресурс не найден" }`;

2. **Код:** 401 Ошибка авторизации  

   **Тело ответа:** `{ error : "Необходима авторизация" }`;

3. **Код:** 400 Ошибка в запросе

   **Тело ответа:** `{ error : "Введен некорректный id" }`;

4. **Код:** 403 Доступ запрещен

   **Тело ответа:** `{ error : "Статья создана другим пользователем" }`;

5. **Код:** 500 Ошибка сервера

   **Тело ответа:** `{ error : "На сервере произошла ошибка" }`;
