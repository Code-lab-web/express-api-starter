// All the endpoints when dealing with the flowers are stored here

import express from "express";
import { Thought } from "../models/Thought.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all flowers (endpoint is /flowers)
router.get("/", async (req, res) => {
  const { color, symbol } = req.query

  //localhost:8080/flowers?color=Red&symbol=love&page=2
  // let filteredFlowers = await Flower.find()

  const query = {}

  if (color) {
    query.color = color
  }

  if (symbol) {
    query.symbolism = symbol
  }

  try {
    const filteredThoughts = await Thought.find(query)


    if (filteredThoughts.length === 0) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No thoughts found for that query. Try another one."
      })
    }
    res.status(200).json({
      success: true,
      response: filteredThoughts,
      message: "Success"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch thoughts"
    })
  }
})

// sort all flowers (endpoint is /flowers/sort)
router.get("/sort", async (req, res) => {
  const { name } = req.params

  //localhost:8080/flowers/sort?name=asc
  //localhost:8080/flowers/sort?name=desc

  const sortCriteriaAsc = { name: "asc" } //{[name]: name === 'asc' ? 1: -1}
  //const sortCriteriaDesc = {name: "desc"}


  try {
    const sortedThoughts = await Thought.find().sort(sortCriteriaAsc)


    if (sortedThought.length === 0) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No thoughts found for that query. Try another one."
      })
    }
    res.status(200).json({
      success: true,
      response: sortedThoughts,
      message: "Success"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch thoughts"
    })
  }
})

// get one flower based on id (endpoint is /flowers/:id)
router.get("/:id", async (req, res) => {
  const { id } = req.params
  //localhost:8080/flowers/${id}

  try {
    const thoughts = await Thought.findById(id)

    if (!thoughts) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Thought not found"
      })
    }

    res.status(200).json({
      success: true,
      response: thoughts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Thought couldn't be found"
    })
  }
})

// Create/Save a flower to the db (endpoint is /flowers)
router.post("/", authenticateUser, async (req, res) => {
  const { name, color } = req.body

  try {
    const newThought = await new Thought({ name, color }).save()

    res.status(201).json({
      success: true,
      response: newThought,
      message: "Thought created successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error, //Be careful when returning error messages to the client, so that you don't expose sensitive information
      message: "Couldn't create thought"
    })
  }
})


// PATCH TO EDIT FLOWER NAME (endpoint is /flowers/:id)
router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const editThought = await Thought.findByIdAndUpdate(id, { name: name },
      { new: true, runValidators: true })
    if (!editThought) {
      return res.status(404).json({ error: "thought not found" })
    }
    res.status(201).json(editThought)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router;