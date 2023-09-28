const multer = require('multer');
const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const Recording = require('../model/recording'); // Import your recording model

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// // Handle the /upload-video route logic
// const handleScreenRecord = (req, res) => {
//   upload.single('my-video')(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       console.error("Multer Error:", err);
//       res.status(StatusCodes.BAD_REQUEST).json({ error: "Something went wrong during file upload" });
//     } else if (err) {
//       console.error("Server Error:", err);
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
//     } else {
//       console.log(`Video uploaded: ${req.file.filename}`);
      
//       // Create a new Recording instance and save it to the database
//       const {title} = req.body
//       const recording = new Recording({
//         title: title,
//         filePath: req.file.path, // Ensure the file path is correctly assigned
//       });

//       recording.save()
//         .then(() => {
//           // File path saved to the database
//           res.status(StatusCodes.OK).json({ message: 'File uploaded and saved to the database successfully' });
//         })
//         .catch((error) => {
//           // Handle database save error
//           console.error('Database Save Error:', error);
//           res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
//         });
//     }
//   });
// };

// module.exports = {
//   handleScreenRecord
// };


const handleScreenRecord = (req, res) => {
  upload.single('my-video')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer Error:", err);
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Something went wrong during file upload" });
    } else if (err) {
      console.error("Server Error:", err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    } else {
      console.log(`Video uploaded: ${req.file.filename}`);

      // Generate a unique identifier for the recording (e.g., a timestamp or UUID)
      const recordingId = uuidv4(); // Adjust the ID generation as needed

      // Create a new Recording instance and save it to the database (optional)
      const { title } = req.body;
      const recording = new Recording({
        title: title,
        filePath: req.file.path,
        recordingId: recordingId, // Associate the ID with the recording
      });

      try {
        await recording.save();
      } catch (error) {
        console.error('Database Save Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        return;
      }

      // Construct the link or identifier for the recording
      const recordingLink = `/api/v1/screen-record/${recordingId}`; // Adjust the URL structure

      // Return the link in the response
      res.status(StatusCodes.OK).json({ message: 'File uploaded successfully', recordingLink });
    }
  });
};


module.exports = {
  handleScreenRecord
};