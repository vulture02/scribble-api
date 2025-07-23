import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import ratelimiter from './middleware/rateLimiter.js';
import cors from 'cors';
dotenv.config();
const app= express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend UR
}))
app.use(express.json()); 
app.use(ratelimiter);

// app.use((req, res, next) => {
//     console.log("method")
//     next();
// })
app.use("/api/notes",notesRoutes);

connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

})

