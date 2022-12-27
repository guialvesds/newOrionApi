import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
        title: {
            type: String,
            require: true,
            trim: true,
        },
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        idCard: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }
})

const List = mongoose.model("List", ListSchema);

export default List;