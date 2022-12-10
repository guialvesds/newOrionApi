import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  titleTask: {
    type: String,
    require: true,
  },
  idCard: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "Card",
    require: false,
  },
  created_at:{
    type: Date,
    default: new Date(),
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  subTask: [],
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
