const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Harshal:C9I9FqPUb0vPsejN@cluster0.imc6gc6.mongodb.net/RoomSystem?retryWrites=true&w=majority');
const owner = require("./models/owner");
const loginRoutes = require('./routes/login');



app.get('/owners', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    owner.find().then(result => {
        res.json(result);
    })
});

app.use("/login", loginRoutes);

app.listen(4000);