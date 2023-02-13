import multer from "multer";
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


