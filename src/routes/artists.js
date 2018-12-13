import { Router } from "express";
import * as ArtistController from "@/controllers/artists";

const router = new Router();

/**
 * @description Create new Artist
 * @method POST
 */
router.post("/", ArtistController.create);

/**
 * @description Get All Artists
 * @method GET
 */
router.get("/", ArtistController.getAll);

/**
 * @description Get Artist by Id
 * @param {Number} id
 * @method GET
 */
router.get("/:id", ArtistController.getById);

export default router;
