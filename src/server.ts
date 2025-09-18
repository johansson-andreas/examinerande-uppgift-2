import  express  from "express";
import dotenv from 'dotenv';
import connectDB from "./db";

dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());

// Connect to MongdoDB
connectDB()
.then(e => console.log('connected to mongoDB'))
.catch(error => {
    console.error('Issue running server', error)
})

// Start server
app.listen(port, () => {
    console.log(`running on`, port)
})

