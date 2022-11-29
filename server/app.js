const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('config');
const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');

const app = express();
const PORT = config.get('port') ?? 8080;
const MONGO_URI = config.get('mongoUri');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);

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
