import AppError from "../../common/models/appError.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import type { Request, Response, NextFunction } from "express";
import type { InsertableAddress, InsertableUser, ResponseSchema } from "../../common/types";
import env from "../../common/env.js";

class UserController {
    static async handleSignin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body.user;
            const user = await User.authenticateUser(email, password);
            const roles = new Set(["customer", "provider", "admin"])
            if (!user || !roles.has(user.role)) {
                const payload: ResponseSchema = {
                    success: false,
                    data: null,
                    message: "Não foi possível entrar com essas credenciais."
                };

                res.status(401).json(payload);
                return // This is to mitigate some annoying lint errors
            }

            const token = jwt.sign(
                { user_id: user.user_id, username: user.username, role: user.role },
                env.jwt_secret,
                { expiresIn: "7d" }
            )

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: env.api_env === "prod",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            const payload: ResponseSchema = {
                success: true,
                message: "Usuário autenticado.",
                data: {
                    user: {
                        user_id: user.user_id,
                        username: user.username,
                        role: user.role,
                        email: user.email,
                        phone_number: user.phone_number
                    }
                }
            }

            res.status(200).json(payload)
        } catch (err: any) {
            next(new AppError({ err }))
        }
    }

    static async handleSignup(req: Request, res: Response, next: NextFunction) {
        try {
            const user: InsertableUser = req.body.user;
            const address: Omit<InsertableAddress, "user_id"> = req.body.address;

            if (!address || !user) {
                const payload: ResponseSchema = {
                    success: false,
                    data: null,
                    message: "Campos faltando para a criação do usuário"
                }
                res.status(400).json(payload);
            }

            const saltRounds = 12;
            user.password = await bcrypt.hash(user.password, saltRounds);

            const user_id = await User.addOne(user);

            if (!user_id) {
                const payload: ResponseSchema = {
                    success: false,
                    data: null,
                    message: "Não foi possível criar o usuário"
                }
                res.status(400).json(payload);
            }

            const payload: ResponseSchema = {
                success: true,
                data: {
                    user: {
                        user_id
                    }
                },
                message: "Usuário criado com sucesso."
            }

            res.status(200).json(payload);
        } catch (err: any) {
            next(new AppError({ err }))
        }
    }
}

export default UserController;
