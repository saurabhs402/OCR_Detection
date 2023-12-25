const dotenv=require("dotenv")
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
dotenv.config({ path:'../.env'}) 

const app = express();
const PORT = process.env.PORT || 5000;



// MongoDB Atlas connection string (replace with your own connection string)
const mongoURI = process.env.MONGO_URI;

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

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Example route to create a new user
app.post('/users', async (req, res) => {
  try {
    console.log("Printing request")
    console.log(req.body.body)
    console.log("typeof " + typeof req.body.body)
    const result=JSON.parse(req.body.body)
    console.log(result)
    console.log("Request Printed")
    const identification_number=result.identification_number;
    console.log("ID ",identification_number)
    // res.json({message:req.body})
    

   const existingUser = await User.findOne({ identification_number });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the same identification number already exists' });
    }

    const newUser = await User.create(result);

    newUser.save()
    .then(()=>{ res.status(201).json({message:newUser}) })
    .catch((err)=>{res.status(500).json({error:"failed to store"})})
   
  } catch (error) {
    console.log("validation errors:",error.errors);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getUsers',(req,res)=>{
  // t fetch entire data
  User.find()
  .then(users=>res.json(users))
  .catch(err=>res.json(err))

})

app.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user with the given ID exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"));
}


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
