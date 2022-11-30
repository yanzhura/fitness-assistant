# Training plan
Дипломный проект для курса "Junior Frontend-разработчик"

## Запуск проекта

#### Северная часть
Запуск осуществляется из папки server
```
cd server
npm run serve
```
Для запуска необходимо получить данные для подключения к базе данных MongoDB и создать конфигурационный файл /server/config/default.json со следующим содержимым:
```
{
    "port": 8080,
    "mongoUri": "mongodb://connetctionString
}
```

#### Клиентская часть
Запуск осуществляется из папки client
```
cd client
npm i
npm run start
```