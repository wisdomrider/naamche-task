"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateError = void 0;
const generateError = (res, error, statusCode = 406) => {
    if (error.name === "ValidationError") {
        return res.status(400).json({
            error: error.message,
        });
    }
    res.status(statusCode).send({
        error,
    });
};
exports.generateError = generateError;
