import multer from "multer";
import path from "path";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

aws.config.update({
  accessKeyId: "AKIAXPVE3YZTYBJP2MCB",
  secretAccessKey: "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",
  region: "sa-east-1",
});

const s3 = new aws.S3();

export const storage = multer({
  storage: multerS3({
    s3,
    bucket: "orionapp-files",
    acl: "public-read-write",
    key(req, file, cb) {
      const timeH = new Date().getHours();
      const timeM = new Date().getMinutes();
      const timeS = new Date().getSeconds();
      cb(null, `${timeH}${timeM}${timeS}_${file.originalname}`);
    },
  }),
});

// export const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "src/uploads");
//   },
//   filename: (req, file, callback) => {
//     const timeH = new Date().getHours();
//     const timeM = new Date().getMinutes();
//     const timeS = new Date().getSeconds();
//     callback(null, `${timeH}${timeM}${timeS}_${file.originalname}`);
//   },
//   fileFilter(req, res, cb) {
//     if (!file.originalname.match(/\.(jpg|png|PNG|JPG|JPEG|jpeg|pdf|PDF)$/))
//       return cb(new Error("Formato inválido!"));
//       cb(undefined, true)
//   },
// });

// export const fileFormat = multer({
//   fileFilter(req, file, callback){
//     if(!file.originalname.endsWith('.jpg')){
//       console.log("Formato invalido");
//     return callback(new Error("Arquivo inválido!"));
//     callback(undefined, true);
//     }
//   }
// })
