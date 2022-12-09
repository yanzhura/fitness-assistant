const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const cors = require('cors');
const config = require('config');
// const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');
const path = require('path');
const https = require('https');

const app = express();
const HTTP_PORT = config.get('httpPort') ?? 8080;
const HTTPS_PORT = config.get('httpsPort') ?? 8443;
const MONGO_URI = config.get('mongoUri');

const productionStatic = path.join(__dirname, 'static');
const productionIndex = path.join(__dirname, 'static', 'index.html');
const cert = path.join(__dirname, 'certs', 'fullchain.pem');
const key = path.join(__dirname, 'certs', 'privkey.pem');
const productionOptions = {
    cert,
    key
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(require('helmet')());
    app.use('/', express.static(productionStatic));
    app.get('*', (req, res) => {
        res.sendFile(productionIndex);
    });
}

const start = async () => {
    try {
        // Блок заполнения БД данными отключен, т.к. предпочтительней
        // разворачивать данные из бэкапа.
        // mongoose.connection.once('open', () => {
        //     initDatabase();
        // });
        await mongoose.connect(MONGO_URI);
        console.log(chalk.green('MongoDB database connected.'));
        app.listen(HTTP_PORT, () => {
            console.log(chalk.green(`Server started at port ${HTTP_PORT}`));
        });
        if (process.env.NODE_ENV === 'production') {
            https.createServer(productionOptions, app).listen(HTTPS_PORT);
        }
    } catch (error) {
        console.log(chalk.red(`Server caused error: ${error.message}`));
        process.exit(1);
    }
};

start();
