const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Harshal:C9I9FqPUb0vPsejN@cluster0.imc6gc6.mongodb.net/RoomSystem?retryWrites=true&w=majority');
//
const loginRoutes = require('./routes/login');
const tenantRoutes = require('./routes/tenant')

app.use("/login", loginRoutes);
app.use("/tenants", tenantRoutes);

app.listen(4000);