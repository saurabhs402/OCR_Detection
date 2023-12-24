const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Atlas connection string (replace with your own connection string)
const mongoURI = 'mongodb+srv://saurabh:saurabh@cluster0.swkrhj8.mongodb.net/OCR-detect?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("Connection successful"))
.catch((err)=> console.log("no connection"));
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Define the model schema
const userSchema = new mongoose.Schema({
  identification_number: { type: String, required: true },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  date_of_issue: { type: String, required: true },
  date_of_expiry: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

// Example route to create a new user
app.post('/users', async (req, res) => {
  try {
    console.log(req.body)
    // const {identification_number,name,last_name,date_of_birth,date_of_issue,date_of_expiry}=req.body;
    // res.json({message:req.body})
    const newUser = await User.create(req.body);
    newUser.save()
    .then(()=>{ res.status(201).json({message:newUser}) })
    .catch((err)=>{res.status(500).json({error:"failed to store"})})
   
  } catch (error) {
    console.log("validation errors:",error.errors);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
