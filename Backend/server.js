require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user')
const detailRoutes = require('./routes/detail')
const scheduleRoutes = require('./routes/schedule')
const attendanceRoutes = require('./routes/Attendance')
const authRoutes = require('./routes/auth')


//express app
const app = express()

//middleware
const corsOptions = {
    origin:'http://localhost:8081', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())

//routes
app.use('/api/users', userRoutes)
app.use( '/api/detail' ,detailRoutes)
app.use('/api/schedule',scheduleRoutes)
app.use('/api/attendance',attendanceRoutes)
app.use('/api/auth', authRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for request
app.listen(process.env.PORT,() => {
    console.log('connected to db & listening on port',process.env.PORT)
})
})
.catch((error) => {
    console.log(error)
})