const fs = require('fs');
const path = require('path');
const Recording = require('../model/recording')
const {StatusCodes} = require('http-status-codes')

        // Function to get all recordings
const getAllRecordings = async (req, res) => {
    try {
      const recordings = await Recording.find({}, 'title'); // Query the database for recording titles
      res.status(200).json({ recordings });
    } catch (error) {
      console.error('Error:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };
   

const getSingleRecordingFile = async (req, res) => {
  try {
    const { id: recordingId } = req.params;
    // Assuming you have a Recording model with a `filePath` field
    const recording = await Recording.findOne({ _id :recordingId });
    
    if (!recording) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Recording not found' });
    }
    res.status(StatusCodes.OK).json({recording})
  } catch (error) {
    console.error('Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
  
};

module.exports = {
  getSingleRecordingFile,
getAllRecordings
};
