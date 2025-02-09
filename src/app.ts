import 'reflect-metadata';

import express, { Response, Request, NextFunction } from 'express';
import logger from './config/logger';
import { HttpError } from 'http-errors';
import authRouter from './routes/auth';

const app = express();

// to parse the incoming request with JSON payloads ( mtlb jab bhi koi request aayegi toh usko json me convert karega )
app.use(express.json());

app.get('/', (req, res) => {
    // const err = createHttpError(401, 'you are not authorized');

    // next(err);
    res.send('Welcome to the auth page from docker ');
});

app.use('/auth', authRouter);

/* Global error handler */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: '',
                location: '',
            },
        ],
    });
});

export default app;
