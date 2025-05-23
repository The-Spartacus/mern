import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.get("/user", (req, res) =>{});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("server started at http://Localhost:5000/user" );
});
