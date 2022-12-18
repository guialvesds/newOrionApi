import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  code: {
    type: Number,
    require: false,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  tag: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  delivery_date: {
    type: Date,
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  tasks: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Task",
    require: true,
  },
  comments: {
    type: Array,
    require: false,
  },
  members: {
    type: Array,
    require: false,   
  },
  files: {
    type: Array,
    require: false,
    }
});

const Card = mongoose.model("Card", CardSchema);

export default Card;
