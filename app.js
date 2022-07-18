require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@cluster0.imc6gc6.mongodb.net/${process.env.database}?retryWrites=true&w=majority`);
var bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const outstandingRoutes = require('./routes/outstanding');
const tenantRoutes = require('./routes/tenant');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With ,Content-Type,Authorization ,Accept",
        "HTTP/1.1 200 OK",
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS,PUT"
    );
    next();
});


app.use("/login", loginRoutes);
app.use(auth);
app.use("/outstanding", outstandingRoutes);
app.use("/tenants", tenantRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});
app.use(errorHandler);


app.listen(process.env.PORT);