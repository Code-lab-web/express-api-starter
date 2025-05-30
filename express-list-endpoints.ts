const express = require("express");
const expressListEndpoints = require("express-list-endpoints");

let app = express();

app
  .route("/")
  .all(function namedMiddleware(req, res) {
    // Handle request
  })
  .get(function (req, res) {
    // Handle request
  })
  .post(function (req, res) {
    // Handle request
  });

app.route("/about").get(function (req, res) {
  // Handle request
});

const endpoints = expressListEndpoints(app);

console.log(endpoints);

/* It omits 'all' handlers.
[
  {
    path: '/',
    methods: [ 'GET', 'POST' ],
    middlewares: [ 'namedMiddleware', 'anonymous', 'anonymous' ]
  },
  {
    path: '/about',
    methods: [ 'GET' ],
    middlewares: [ 'anonymous' ]
  }
]
*/
import express from "express";
import expressListEndpoints from "express-list-endpoints";

let app = express();

app
  .route("/")
  .all(function namedMiddleware(req, res) {
    // Handle request
  })
  .get(function (req, res) {
    // Handle request
  })
  .post(function (req, res) {
    // Handle request
  });

app.route("/about").get(function (req, res) {
  // Handle request
});

const endpoints = expressListEndpoints(app);

console.log(endpoints);