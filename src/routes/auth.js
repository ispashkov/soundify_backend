import { Router } from "express";
import * as AuthController from "@/controllers/auth";

const router = new Router();

/**
 * @description Login user
 * @method POST
 */
router.post("/login", AuthController.login);

/**
 * @description Get current user
 * @method GET
 */
router.get("/current", AuthController.current);

export default router;
