import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const timeH = new Date().getHours();
    const timeM = new Date().getMinutes();
    const timeS = new Date().getSeconds();
    callback(null, `${timeH}${timeM}${timeS}_${file.originalname}`);
  },
});

// export const fileFormat = multer({
//   fileFilter(req, file, callback){
//     if(!file.originalname.endsWith('.jpg')){
//       console.log("Formato invalido");
//     return callback(new Error("Arquivo inválido!"));
//     callback(undefined, true);
//     }
//   }
// })
