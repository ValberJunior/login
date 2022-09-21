require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const mongoose = require('mongoose');

//MongoDB -- Atlas
mongoose.connect(process.env.MONGO_CONNECTION_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err)=>{
        if (!err)  console.log("MongoDB Connected");
        else  console.log(err);
    })

//user
app.use('/user',express.json(),userRouter);
//admin
app.use('/admin',express.json(),adminRouter);

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})