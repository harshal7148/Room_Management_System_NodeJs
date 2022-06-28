const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Harshal:C9I9FqPUb0vPsejN@cluster0.imc6gc6.mongodb.net/RoomSystem?retryWrites=true&w=majority');
var bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const outstandingRoutes = require('./routes/outstanding');

app.use(bodyParser.json());

app.use("/login", loginRoutes);
app.use("/outstanding", outstandingRoutes);

app.listen(4000);