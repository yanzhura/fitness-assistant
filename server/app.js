const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const cors = require('cors');
const config = require('config');
const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = config.get('port') ?? 8080;
const MONGO_URI = config.get('mongoUri');

const productionStatic = path.join(__dirname, 'static');
const productionIndex = path.join(__dirname, 'static', 'index.html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(productionStatic));
    app.get('*', (req, res) => {
        res.sendFile(productionIndex);
    });
}

const start = async () => {
    try {
        mongoose.connection.once('open', () => {
            initDatabase();
        });
        await mongoose.connect(MONGO_URI);
        console.log(chalk.green('MongoDB database connected.'));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server started at port ${PORT}`));
        });
    } catch (error) {
        console.log(chalk.red(`Server caused error: ${error.message}`));
        process.exit(1);
    }
};

start();
