# Training plan

Дипломный проект для курса "Junior Frontend-разработчик"

## Запуск проекта

#### Северная часть

Для запуска необходимо получить строку подключения к базе данных MongoDB и создать конфигурационный файл /server/config/default.json со следующим содержимым:

```
{
    "port": 8080,
    "mongoUri": "mongodb://connetctionString
}
```

Запуск осуществляется из папки server:

```
cd server
npm i
npm run serve
```

#### Клиентская часть

Запуск осуществляется из папки client:

```
cd client
npm i
npm run start
```
