import { Router } from "express";
import { createAlbum, createMusic } from "../controllers/music.controller.js";
import { upload } from "../config/multer.config.js";

const musicRouter = Router()

musicRouter.post("/upload", upload.single("music"), createMusic)
musicRouter.post("/album", createAlbum)

export default musicRouter