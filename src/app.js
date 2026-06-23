import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import nodesRoutes from './modules/nodes/nodes_routes.js';
import userRoutes from './modules/user/user_routes.js';

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use('/user', userRoutes);
app.use('/nodes', nodesRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;