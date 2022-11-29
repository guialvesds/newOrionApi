const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    creatred_At: {
        type: Date,
        default: new Date()
    },
});
 
const User = mongoose.model("User", UserSchema)

module.exports = User;