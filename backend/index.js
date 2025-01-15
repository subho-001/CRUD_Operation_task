const express = require("express")

const cors = require('cors');

const employeeRoutes = require('./routers/employees.routes')

const connectDB = require('./helpers/dbConnect')

const dotenv = require('dotenv');

dotenv.config()


const app = express();

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', employeeRoutes);

app.use((err,req,res,next)=>{
    res.status(500).json({error:true, message:err.message})
})

app.get('/',(req,res)=>res.send('Server is running'));

//MongoDB connection
let startServer =async()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        console.log("mongodb connected");
        app.listen(process.env.PORT,()=>{
            console.log(`server is runing on port ${process.env.PORT}`);
        })
    } catch(err) {
        console.log("failed to connect to the database",err);   
    }
}

startServer()
