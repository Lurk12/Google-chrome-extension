const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
    title: {
        type: String, 
    },
    videoUrl: {
        type: String,
      },
      filename:{
        type: String,
      }
    
},{timestamps: true})


module.exports = mongoose.model('Recording', recordingSchema)