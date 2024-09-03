import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';

import { URL } from './utils/config';
import exerciseRouter from './routes/exercises';
import * as middleware from './utils/middleware';

mongoose.set('strictQuery', false);

if (URL) {
    mongoose.connect(URL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(error => {
            console.log('error connecting to MongoDB:', error);
        });
}

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/exercises', exerciseRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
