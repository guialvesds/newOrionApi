import Card from "../models/Card.js";

export const createService = (body) => {
    return Card.create(body);
};

export const findAllService = () => {
    return Card.find().sort({_id: -1}).populate("user");
} ;

export const finCardIdService = (id) => {
    return Card.findById(id).populate("user");
};

export const byUserService = (id) => {
    return Card.find({user: id}).sort({_id: -1}).populate("user");
};

export const updateCardService = (id, title, tag, delivery_date, description, tasks, comments) => {
    return Card.findOneAndUpdate({_id: id}, { title, tag, delivery_date, description, tasks, comments,} , {
        rawResult: true,
    });
};

export const deleteCardService = (id) => {
    return Card.findOneAndDelete({_id: id});
}

export const addCommentService = (idCard, comment, userId) => {

    const idComment = Math.floor(Date.now() * Math.random()).toString(20)

    return Card.findOneAndUpdate({_id: idCard}, {$push: {comments: {
        idComment, userId, comment, created_At: new Date()
    }}});
}

export const deleteCommentService = (idCard, idComment, userId) => {
    return Card.findOneAndUpdate({_id: idCard}, { $pull: {comments: {idComment, userId}}})
}