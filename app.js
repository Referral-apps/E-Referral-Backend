const express = require('express')
const cors = require('cors')

const staffRoutes = require('./routes/staffRoutes')

require('dotenv').config()

//Connect to DB
require('./database/connect')

const app = express()

app.use(cors({
    origin:'*'
}))

// app.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin", "*")
//     next()
// })



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(staffRoutes)

app.use('/api', staffRoutes)

app.use('/', (req, res, next)=>{
    res.status(200).json({message: 'E-Referral API is running'})
})

const PORT = process.env.NODE_ENV=="development" ? 3000 : process.env.PORT;
 
app.listen(PORT, ()=>{
    console.log(`API Server Running PORT at ${PORT}`)
})