import express from "express";

const requestLogger = (req: express.Request, _res: express.Response, next: express.NextFunction): void => {
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Body:', req.body);
    console.log('---');
    next();
};

const unknownEndpoint = (_req: express.Request, res: express.Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: Error, _req: express.Request, res: express.Response, next: express.NextFunction): void => {
    console.error(error.message);
    
    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
    }

    next(error);
};

export { requestLogger, unknownEndpoint, errorHandler };
