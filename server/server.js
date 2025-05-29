import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import connectDB from './config/mongodb.js'; //mongoDB

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';


import formRoutes from './routes/formRoutes.js';
import hackathonRoutes from "./routes/hackathonRoutes.js"
import leaveRoutes from "./routes/leaveRoutes.js"
import idRoutes from './routes/idRoutes.js'


// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// storage folders
app.use("/uploads", express.static("uploads"));
app.use("/hackathonuploads", express.static(join(__dirname, "hackathonuploads")));
app.use('/pdfs', express.static(join(__dirname, 'pdfs')));
app.use('/Idpdfs', express.static(join(__dirname, 'Idpdfs')));


//API
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)


app.use("/api", formRoutes);
app.use("/api", hackathonRoutes);
app.use("/api", leaveRoutes);
app.use("/api", idRoutes);


app.get('/', (req, res) => {
  res.send('API WORKING!!');
});

app.listen(PORT, () => {
  console.log(`👍 Server is running on PORT : ${PORT}`);
});