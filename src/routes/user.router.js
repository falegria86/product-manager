import { Router } from "express";
import * as controllers from "../controllers/user.controller.js"

const router = Router();

import { validateLogin } from "../middlewares/validateLogin.js";

router.post("/login", controllers.login);

router.post('/register', controllers.register);

router.get("/info", validateLogin, controllers.infoSession);

router.get("/secret-endpoint", validateLogin, controllers.visit);

router.post("/logout", controllers.logout);

export default router;
