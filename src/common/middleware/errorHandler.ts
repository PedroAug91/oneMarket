import type { Response, Request, NextFunction } from "express";
import type { ResponseSchema } from "../types";
import type AppError from "../models/appError";

function errorHandler(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    console.error(err.originalErr);

    const payload: ResponseSchema = {
        success: false,
        message: err.resMessage,
        data: err.data,
    };

    res.status(err.status).json(payload);
}

export default errorHandler;
