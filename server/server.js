require('dotenv').config();
import express from 'express';
import initRoutes from './src/routes';
import connectDB from './src/config/connectDB';
import { app, server } from './socket/socket';
import cors from 'cors';

app.use(
    cors({
        origin: [process.env.CLIENT_URL, process.env.OTHER_URL],
        // origin: '*',
        method: ['POST', 'GET', 'PUT', 'DELETE'],
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const port = process.env.PORT;
const listener = server.listen(port, '0.0.0.0', () => {
    console.log(listener.address().port);
});

connectDB();
