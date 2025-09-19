import e from "express";
import UserController from "../controllers/user.controller.js";

import type { Router, RouterOptions } from "express";

const routerConfigs: RouterOptions = {
    // ...
};

const userRouter: Router = e.Router(routerConfigs);

export default userRouter;
