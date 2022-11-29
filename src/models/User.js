import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
        require: true,
        select: false
    },
    creatred_At: {
        type: Date,
        default: new Date()
    },
});

//Antes de salvar faça algo
UserSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
 
const User = mongoose.model("User", UserSchema)

export default User;