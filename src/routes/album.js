import { Router } from "express";
import passport from "passport";
import upload from "@/middlewares/upload";
import * as AlbumController from "@/controllers/album";

const router = new Router();

/**
 * @description Create new Album
 * @method POST
 */
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  upload.single("cover"),
  AlbumController.create
);

/**
 * @description Get all albums
 * @method GET
 */
router.get("/", AlbumController.getAll);

export default router;
