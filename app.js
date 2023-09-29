require('dotenv').config()
const express = require('express')
const uploadScreenRecorder= require('./routes/router')
const app = express()
const connectDB = require('./db/connect')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res)=>{
    res.send('File uploads working!, not just on this route!')
})



app.use('/api/upload', uploadScreenRecorder ); 
app.use('/api/v1/recordings', uploadScreenRecorder)
app.use('/api/v1/recording', uploadScreenRecorder)


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