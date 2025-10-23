const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();
const cors = require('cors');
const PORT = 5000; 

const app=express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log('MongoDB Connected!'))
 .catch((err) => {
   console.error('MongoDB Connection Error!!',err.message);
 });

 app.use('/api/events',eventRoutes);

 app.listen(PORT,() =>{
    console.log(`Server is running on port${PORT}`);
 });