import express from "express";
import cors from "cors";

import data from "./data.json";
import listEndpoints from 'express-list-endpoints'


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const express = require("express");
const expressListEndpoints = require("express-list-endpoints");

const port = process.env.PORT || 8080;
const app = express();
const expressListEndpoints = require("express-list-endpoints");



// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello World!")
  const endpoints = listEndpoints(app);
  res.json({
    message: "Welcome to Happy Thoughts API",
    endpoints: endpoints
  });
});
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


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
