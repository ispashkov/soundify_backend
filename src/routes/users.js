import { Router } from "express";
import * as UserController from "@/controllers/users";

const router = new Router();

/**
 * @description Create new user
 * @method POST
 */
router.post("/", UserController.create);

/**
 * @description Remove user
 * @method DELETE
 * @param id
 */
router.delete("/:id", UserController.delete);

export default router;
