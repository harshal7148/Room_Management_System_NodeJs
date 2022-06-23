const express = require('express');
const app = express();
const owner = require('./Owner');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Harshal:C9I9FqPUb0vPsejN@cluster0.imc6gc6.mongodb.net/RoomSystem?retryWrites=true&w=majority')

owner.find({},function(err, owner){
   if(err){
     console.warn(err);
   }
   console.warn("owners",owner);
})


app.get('/owners',function(req,res){
  res.set('Access-Control-Allow-Origin', '*');
   owner.find().then(result =>{
     res.json(result);
   })
})

app.listen(4000);
