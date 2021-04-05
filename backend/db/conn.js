const express = require('express');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/nutrition', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection with mongo is successfully !")
}).catch((e) => {
    console.log(e)
})
