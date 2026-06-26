import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import nodesRoutes from './modules/nodes/nodes_routes.js';
import userRoutes from './modules/user/user_routes.js';
import storageRoutes from './modules/storage/storage_route.js'

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  exposedHeaders: ['x-filename', 'Content-Disposition', 'Content-Type']
}))

app.use('/user', userRoutes)
app.use('/nodes', nodesRoutes)
app.use('/storage', storageRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;