import List from "../models/List.js"

export const addListService = (body, idUser) => {
  return List.create(body, idUser);
};

export const getListService = () => {
  return List.find();
}

export const getListCardService = (idCard) => {
  return List.find({idCard: idCard})
}

export const getListByIdService = (idTask) => {
return List.findById(idTask);
}

export const editListService = (id, title) => {
  return List.findOneAndUpdate(
    { _id: id },
    { title } 
  );
}

export const deleteListService = (id) => {
  return List.deleteOne(id);
}
