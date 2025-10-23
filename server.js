require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Occasion = require('./models/Occasion');

const app=express();
 
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log('MongoDB Connected!'))
 .catch((err) => {
   console.error('MongoDB Connection Error!!',err.message);
 });


 // 📋 Get All Events
app.get("/api/occasion", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});


// ➕ Add Event
app.post("/api/occasion/add", async (req, res) => {
  try {
    const { name, date, organiser, location } = req.body;
    const newEvent = new Event({ name, date, organiser, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});


// ✏️ Update Event
app.put("/api/occasion/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
});

// ❌ Delete Event
app.delete("/api/occasion/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});


const PORT=process.env.PORT || 5000;
 app.listen(PORT,() =>{
    console.log(`Server is running on port${PORT}`);
 });