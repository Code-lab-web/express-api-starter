import mongoose, { Schema } from "mongoose";

const thoughtSchema = new mongoose.Schema({
  
    id: String,
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});
export const thought = mongoose.model("Thought", thoughtSchema)