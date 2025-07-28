import express,{Request,Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './routes/authroute';
import userRoutes from './routes/userRoutes'
import courseRoutes from './routes/courseRoute';
import path from 'path';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true, // if you're using cookies/auth headers
}));

app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    res.send("helle type script");
});

app.use('/api/auth', router);
app.use('/api/user',userRoutes);
app.use('/api/course',courseRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})

