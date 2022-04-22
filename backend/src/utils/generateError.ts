import { Response } from "express";
export const generateError = (
  res: Response,
  error: any,
  statusCode: number = 406
) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  }
  res.status(statusCode).send({
    error,
  });
};
