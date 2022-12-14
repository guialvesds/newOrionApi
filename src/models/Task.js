import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    titleTask: {
        type: String,
        Require: true
    },
    cardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        require: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    subTask: {
        type: Array,
        require: false
    }
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;