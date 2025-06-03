import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';

import data from "./data.json";
import listEndpoints from 'express-list-endpoints'


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const port = process.env.PORT || 8080;
const app = express();
// Removed redundant import for express-list-endpoints



// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here
app.get("/", (req, res) => {
  res.send(process.env.API_KEY)
  const endpoints = listEndpoints(app);
  res.json({
    message: "Welcome to Happy Thoughts API",
    endpoints: endpoints,
  });
});

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



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/data", (req, res) => {
  const { color } = req.query;
  console.log('queries:', req.query);
  res.json(data);
});

// Ensure all routes and blocks are properly closed