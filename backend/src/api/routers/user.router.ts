import e from "express";
import UserController from "../controllers/user.controller.js";

import type { Router, RouterOptions } from "express";
import validateJWT from "../../common/middleware/validateJWT.js";

const routerConfigs: RouterOptions = {
    // ...
};

const userRouter: Router = e.Router(routerConfigs);

userRouter.post("/signup", UserController.handleSignup)
userRouter.post("/signin", UserController.handleSignin)

export default userRouter;
