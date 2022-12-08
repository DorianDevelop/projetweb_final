const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const usersRoute = require('./routes/users.route');
const articlesRoute = require('./routes/articles.route');

const { httpLogStream } = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/user', userRoute);
app.use('/users', usersRoute);
app.use('/articles', articlesRoute);

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});


app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});



module.exports = app;