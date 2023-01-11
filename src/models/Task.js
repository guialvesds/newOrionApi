import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    titleTask: {
        type: String,
        Require: true,
        minlength: 1,
        trim: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        require: true,       
    },
    member: {
        type: Array,
        require: false,
    },
    delivery_date: {
        type: Date,
        require: false
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;