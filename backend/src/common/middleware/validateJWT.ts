import jwt from "jsonwebtoken";
import AppError from "../models/appError";
import env from "../env";

import type { NextFunction, Request, Response } from "express";
import type { ResponseSchema } from "../types";

const sendUnauthorizedRes = (res: Response) => {
    const payload: ResponseSchema = {
        success: false,
        data: null,
        message: "Não autorizado.",
    }
    res.status(401).json(payload);
}

function validateJWT(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            sendUnauthorizedRes(res);
        }

        jwt.verify(token as string, env.jwt_secret, (err, decoded) => {
            if (err) {
                sendUnauthorizedRes(res);
            }

            res.locals.decoded = decoded;
        });

        next()
    } catch (err: any) {
        next(new AppError({ err }))
    }
}

export default validateJWT;
