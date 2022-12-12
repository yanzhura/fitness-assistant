const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const cors = require('cors');
const config = require('config');
// const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const HTTP_PORT = config.get('httpPort') ?? 8080;
const HTTPS_PORT = config.get('httpsPort') ?? 8443;
const MONGO_URI = config.get('mongoUri');

const wwwRoot = path.join(__dirname, 'www', 'frontend');
const htmlIindex = path.join(__dirname, 'www', 'frontend', 'index.html');
const fullChain = path.join(__dirname, 'www', 'certs', 'fullchain.pem');
const privKey = path.join(__dirname, 'www', 'certs', 'privkey.pem');
const staticFiles = path.join(__dirname, 'www', 'static');

const productionOptions = {
    cert: fs.readFileSync(fullChain),
    key: fs.readFileSync(privKey)
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);
app.use('/static', express.static(staticFiles));

if (process.env.NODE_ENV === 'production') {
    app.use(require('helmet')());
    app.use('/', express.static(wwwRoot));
    app.get('*', (req, res) => {
        res.sendFile(htmlIindex);
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
