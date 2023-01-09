import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    titleTask: {
        type: String,
        Require: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,       
    },
    member: {
        type: String,
        require: false,
    },
    delivery_date: {
        type: Date,
        require: false
    }
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;