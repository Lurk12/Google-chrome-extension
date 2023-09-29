require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const Video = require("../model/recording");
const streamifier = require("streamifier");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadVideo = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error });
        } else {
          const file = new Video({
            filename: req.file.originalname,
            videoUrl: result.secure_url,
          });
          await file.save();
          res.status(201).json({ file });
        }
        console.log("result", result);
      }
    );
    console.log(stream.secure_url);
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
module.exports = { uploadVideo };