import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/routes.js';

dotenv.config();
app.use(cors({
    origin: process.env.FRONTEND_URL || "*", // FRONTEND_URL to be set in Render later
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));
app.use(cors())
app.use(express.json());
app.use('/api/todos',router)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})

