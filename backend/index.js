const express = require('express')
const mongoose = require('mongoose');
require('./db/conn')
const Food = require('./db/foodSchema')
const app = express();
const port = 8000;
const cors = require('cors')

app.use(express.json());

app.use(cors())

app.post('/food', async (req, res) => {
    const food = req.body;
    const postFood = new Food(food);
    await postFood.save()
    res.send(req.body);
});

app.get('/food', async (req, res) => {
    const getFood = await Food.find();
    res.send(getFood)
});



app.listen(port, () =>{
    console.log(`server is running at ${port}`)
})