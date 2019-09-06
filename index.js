require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./app/app.router');
const database = require('./app/app.database')(config.database);
const app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.listen(config.server.port, console.log("Server started on port", config.server.port));

database.once('open', () => console.log("Connected to database", database.name));
database.on('error', () => console.log(database.name, "database connection error"));