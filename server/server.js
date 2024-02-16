import express from 'express';
require('dotenv').config();
import cors from 'cors';
import initRoutes from './src/routes';
import connectDB from './src/config/connectDB';

const app = express();
app.use(
    cors({
        origin: [process.env.CLIENT_URL, process.env.OTHER_URL],
        // origin: "*",
        method: ['POST', 'GET', 'PUT', 'DELETE'],
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const port = process.env.PORT;
const listener = app.listen(port, '0.0.0.0', () => {
    console.log(listener.address().port);
});

connectDB();
