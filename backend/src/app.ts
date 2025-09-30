import e from "express";
import cors from "cors";
import errorHandler from "./common/middleware/errorHandler.js";
import logger from "./common/middleware/requestLogger.js";

import type { Express, Request, Response, NextFunction } from "express";
import type { ResponseSchema } from "./common/types";
import AppError from "./common/models/appError.js";
import userRouter from "./api/routers/user.router.js";

const app: Express = e();

app.use(cors());
app.use(e.json());
app.use(logger);

app.use("/auth",userRouter)

app.get("/", (_req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ResponseSchema = {
            success: true,
            data: [],
            message: "Tudo nos conformes. =)",
        };

        res.status(200).json(payload);
    } catch (err: any) {
        next(new AppError({ err }));
    }
});

// errorHandler vem depois de todas as rotas.
app.use(errorHandler);

export default app;
