import mongoose from "mongoose";
//import dotenv from 'dotenv'

//require('dotenv').config();
//dotenv.config();

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Connected to database');
    }catch (err){console.log(err);
    }
}

// export const connectDB = mongoose.connect(process.env.DATABASE_URI)
// .then(()=>{console.log('Connected')})
// const db = mongoose.connection
// db.on('error',(error)=> console.log(error))
// db.once('open',()=>console.log('Connected to database MongoDB'));