"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknownEndpoint = exports.requestLogger = void 0;
const requestLogger = (req, _res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('Method:', req.method);
        console.log('Path:', req.path);
        console.log('Body:', req.body);
        console.log('---');
        next();
    }
};
exports.requestLogger = requestLogger;
const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
exports.unknownEndpoint = unknownEndpoint;
const errorHandler = (error, _req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
    }
    next(error);
};
exports.errorHandler = errorHandler;
