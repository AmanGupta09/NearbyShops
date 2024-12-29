const express= require('express')
require('dotenv').config()
const app=express()
const cors=require('cors')
const PORT=process?.env?.PORT||5001
const authRoute=require('./src/routes/authRoutes')
const connectDb = require('./src/connfig/connectDb')
const errorHandler = require('./src/middlewares/errorHandler')
app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Origin'],
}));

app.use('/auth',authRoute)
// app.get('/aman',(req,res)=>{
//         res.status(200).json({title:'FIRST ROUTE',message:'HELLO WORLD!'})
//     })
app.use((req, res, next) => {
    const error = new Error('Route Not Found');
    res.status(404);
    next(error); // Pass to error handler middleware
  });

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`SERVER IS STARTED ON THE PORT ${PORT}`)
    connectDb()
})


