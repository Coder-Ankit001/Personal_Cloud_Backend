import express from 'express';
import nodesRoutes from './modules/nodes/nodes_routes.js';
import userRoutes from './modules/user/user_routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/user', userRoutes);
app.use('/nodes', nodesRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;