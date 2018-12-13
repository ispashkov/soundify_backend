import express, { Router } from "express";
import path from "path";
import auth from "./auth";
import users from "./users";
import tracks from "./tracks";
import artists from "./artists";

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/tracks", tracks);
router.use("/artists", artists);
router.use("/uploads", express.static(path.resolve("uploads")));

export default router;
