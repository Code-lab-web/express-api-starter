import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';

import data from "../../../data.json";
import listEndpoints from 'express-list-endpoints'

import mongoose from "mongoose"

import thoughtsData from "/data/thoughts.json";
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

import userRoutes from "./userRoutes.js";
import thoughtRoutes from "./thoughtRoutes.js";

// Ensure the MONGO_URL environment variable is set in your environment before running the server
// Removed duplicate and incorrect thoughtSchema definition
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
const User = mongoose.model('User',{
  name:{
    type: String,
    unique: true
  },
  password:{
    type:String,
    required:true
  },
  accesToken:{
    type:String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
}); // Close the User model definition

// Example
// POST Request
const request = {name :"Bob", password: "foobar"};
// DB Entry
const dbEntry = {name: "Bob", password: "5abbc32983def"}
bcrypt.compareSync(request.password, dbEntry.password);

// One-way encryption
const user = new User({name: "Bob", password: bcrypt.hashSync("foobar") });
user.save();

mongoose.Promise = Promise;
const Task = mongoose.model('Task', {
  text: {
    type: String,
    required: true,
    minLength: 5
  },
  complete: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}); // Added missing closing brace

const Person = mongoose.model('Person', {
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  height: {
    type: Number,
    required: true,
    min: 5,
  }
}); // Properly closed Person model definition




const thoughtSchema = new mongoose.Schema({
  id: Number,
  name: String,
  scientificName: String,
}); // Added missing closing brace

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Thought.deleteMany({});
  thoughtData.forEach(thought => {
    new Thought(thought).save();
  });
};
seedDatabase();
const thoughtSchema = new mongoose.Schema({
  id: Number,
  name: String,
  symbolism: String,
  scientificName: String,
  color: String,
  description: String,
  lastSpottedTimestamp: {
    type: Date,
    default: Date.now,
  },
}); // Properly closed thoughtSchema definition

app.get("/thoughts", async (req, res) => {
        const { symbol } = req.query;
        const query = {};
      
        if (symbol) {
          query.symbolism = symbol;
        }
      
        try {
          const filteredThoughts = await Thought.find(query);
      
          if (filteredThoughts.length === 0) {
            return res.status(404).json({
              success: false,
              response: [],
              message: "No thoughts found for that query. Try another one."
            });
          }
      
          res.status(200).json({
            success: true,
            response: filteredThoughts,
            message: "Success"
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            response: error,
            message: "Failed to fetch thoughts"
          });
        }
      });
                
      app.get("/thoughts/:id", async (req, res) => {
        const { id } = req.params;
      
        try {
          const thought = await Thought.findById(id);
      
          if (!thought) {
            return res.status(404).json({ 
              success: false,
              response: null,
              message: "Thought not found"
            });
          }
      
          res.status(200).json({
            success: true,
            response: thought
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            response: error, 
            message: "Thought couldn't be found"
          });
        }
      });

      app.patch("/thoughts/:id", async (req, res) => {
        const { id } = req.params;
        try {
          const updatedThought = await Thought.findByIdAndUpdate(id, req.body, { new: true });
          if (!updatedThought) {
            return res.status(404).json({
              success: false,
              response: null,
              message: "Thought not found"
            });
          }
          res.status(200).json({
            success: true,
            response: updatedThought,
            message: "Thought updated successfully"
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            response: error,
            message: "Thought couldn't be updated"
          });
        }
      });
          
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
      });

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const port = process.env.PORT || 8080;
const app = express();

const authenticate = async (req, res, next) => {
  const user = await User.findOne({accesToken:req.headers('Authorization')});
  if(user){
    req.user = user;
    next();
  } else {
    res.status(401).json({loggedOut: true});
  }
};

// Removed redundant import for express-list-endpoints



// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());




// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    message: "Welcome to Happy Thoughts API",
    endpoints: endpoints,
  });
});

app.post('/people', async (req, res) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(200).json(savedPerson);
  } catch (err) {
    // Bad Request
    res.status(400).json({ message: 'Could not save person', errors: err.errors });
  }
});
}n;

// Route to fetch all data
app.get("/data", (req, res) => {
  res.json(data);
});

app.get("/data/:id", (req, res) => {
  console.log('req.params.id', req.params.id);
  const item = data.find((item) => item.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});
const endpointList = expressListEndpoints(app);
app.get("/endpoints", (req, res) => {
  res.json({
    message: "List of thoughts",
    endpoints: endpointList
  });
});
app.get("/endpoints/:path", (req, res) => {
  const path = req.params.path;
  const endpoint = endpointList.find((endpoint) => endpoint.path.includes(path));
  if (endpoint) {
    res.json({
      message: `Endpoint for path ${path} found`,
      endpoint: endpoint,
    });
  } else {
    res.status(404).json({ error: "Endpoint not found" });
  }
});
app.get("css/style.css", (req, res) => {
  res.sendFile(__dirname + "/css/style.css");
});
app.get("js/script.js", (req, res) => {
  res.sendFile(__dirname + "/js/script.js");
});
app.get("/html/index.html", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});
app.get("/html/about.html", (req, res) => {
  res.sendFile(__dirname + "/html/about.html");
});
app.get("/html/contact.html", (req, res) => {
  res.sendFile(__dirname + "/html/contact.html");
});
app.get("/html/404.html", (req, res) => {
  res.sendFile(__dirname + "/html/404.html");
});
app.get("/html/500.html", (req, res) => {
  res.sendFile(__dirname + "/html/500.html");
});
app.get("/html/terms.html", (req, res) => {
  res.sendFile(__dirname + "/html/terms.html");
});
app.get("/html/privacy.html", (req, res) => {
  res.sendFile(__dirname + "/html/privacy.html");
});
app.get("/html/sitemap.html", (req, res) => {
  res.sendFile(__dirname + "/html/sitemap.html");
});
app.get("/html/robots.txt", (req, res) => {
  res.sendFile(__dirname + "/html/robots.txt");
});
app.get("/html/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/html/favicon.ico");
});
app.get("/html/apple-touch-icon.png", (req, res) => {
  res.sendFile(__dirname + "/html/apple-touch-icon.png");
});

app.get("/endpoints", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    message: "List of all endpoints",
    endpoints: endpoints,
  });
});
app.get('/tasks', async (req, res) => {
  try {
    // Endpoint to get all tasks
    const tasks = await Task.find().sort({createdAt: 'desc'}).limit(20).exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
});

app.post('/tasks', async (req, res) => {
  const { text, complete } = req.body;
  try {
    const task = new Task({ text, complete });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Could not save task to the Database', error: err.errors });
  }
});

app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    // Success
    res.json({ _id: user._id, accessToken: user.accesToken });
  } else {
    // Failure
    // a. User does not exist
    // b. Encrypted password does not match
    res.json({ notFound: true });
  }
});
app.post('/tweets', authenticate);
app.post ('/tweets', async (req,res) => {
  
// This will only happen if the next function is called fromthe middleare!
// now we can access the req.user object from the middleware
});

app.get('/secure-data', authenticate, async (req, res) => {
  try {
    const secureData = await SecureData.find();
    res.status(200).json(secureData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch secure data", error });
  }
}); // Close the '/secure-data' route

app.delete("/thought/id", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Thought couldn't be found. Can't delete."
      });
    }
    res.status(200).json({
      success: true,
      response: thought,
      message: "Thought deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Couldn't delete thought"
    });
  }
});

app.patch("/thoughts/:id", async (req, res) => {
  const { id } = req.params;
  const { newThought, color } = req.body;
  try {
    const thought = await Thought.findByIdAndUpdate(
      id,
      { name: newThought, color },
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Thought couldn't be edited."
      });
    }
    res.status(200).json({
      success: true,
      response: thought,
      message: "Thought updated successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Thought couldn't be updated"
    });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/data", (req, res) => {
  const { color } = req.query;
  console.log('queries:', req.query);
  res.json(data);
});
console.log(crypto.randomBytes(128).toString('hex'));
console.log(bcrypt.hashSync("foobar"));

// Ensure all routes and blocks are properly closed