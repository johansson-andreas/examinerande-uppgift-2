import  express  from "express";
import dotenv from 'dotenv';
import connectDB from "./db";
import router from "./api/index"

dotenv.config();
const port = 3001;
const app = express();
app.use(express.json());

app.use("/api", router);
connectDB()
.then(e => console.log('connected to mongoDB'))
.catch(error => {
    console.error('Issue running server', error)
})

// Start server
app.listen(port, () => {
    console.log(`running on`, port)
})

