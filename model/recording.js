const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    description:{
        filePath:{
            type :String ,
        },
        
    }
    
},{timestamps: true})


module.exports = mongoose.model('Recording', recordingSchema)