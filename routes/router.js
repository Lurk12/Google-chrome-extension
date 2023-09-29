
const express = require("express");
const router = express.Router();
const uploadController = require("../controller/screenRecordController");

const multer = require("multer");

const { getAllRecordings, getSingleRecordingFile } = require("../controller/getRecordingFile");

const {uploadVideo} = uploadController;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
// upload video: POST
// router.post("/upload", upload.single("video"), uploadVideo);

router.route("/").post( upload.single("video"), uploadVideo);
router.route('/').get(getAllRecordings)
 router.route('/:id').get(getSingleRecordingFile);
module.exports = router;