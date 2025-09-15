import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/routes.js';

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json());
app.use('/api/todos',router)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})

