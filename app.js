require('dotenv').config()
const express = require('express')
const uploadScreenRecorder= require('./routes/router')
const app = express()
const connectDB = require('./db/connect')

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('File uploads working!, not just on this route!')
})


app.use('/uploads', express.static('uploads'));


app.use('/api/v1/screen-record', uploadScreenRecorder); // For the route without an ID


const port = process.env.PORT || 3000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start()