const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('./lib/logger/logger');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dbInitialize = require('./lib/db/initialize/dbInitialize')();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('*', function(req, res) {
    res.status(404).send({ error: 'No such POST route' });
});
app.get('*', function(req, res) {
    res.status(404).send({ error: 'No such GET route' });
});

dbInitialize.createDB(
    {
        reset: true
    },
    function() {
        if (process.env.NODE_ENV === 'production') {
            dbInitialize.useDB();
        } else {
            dbInitialize.addInitialData();
        }
    }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    const contextInfo = `Error Context:
        referrer: ${req.headers.referer},
        originalUrl: ${req.originalUrl},
        method: ${req.method},
        body: ${JSON.stringify(req.body)}
    `;
    logger.error(contextInfo);
    logger.error(err);
    res.status(err.status || 500).send('Something broke!');
});

module.exports = app;
