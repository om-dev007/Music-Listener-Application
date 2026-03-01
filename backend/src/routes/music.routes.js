import { Router } from "express";
import { createMusic } from "../controllers/music.controller.js";
import { upload } from "../config/multer.config.js";

const musicRouter = Router()

musicRouter.post("/upload", upload.single("music"), createMusic)

export default musicRouter