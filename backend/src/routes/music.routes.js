import { Router } from "express";
import { createAlbum, createMusic, getAlbumById, getAllAlbums, getAllMusic } from "../controllers/music.controller.js";
import { upload } from "../config/multer.config.js";
import { authArtist, authUser } from "../middlewares/auth.middleware.js";

const musicRouter = Router()

musicRouter.post("/upload", authArtist , upload.single("music"), createMusic)
musicRouter.post("/album",  authArtist ,createAlbum)
musicRouter.get("/", authUser , getAllMusic)
musicRouter.get("/albums", authUser, getAllAlbums )
musicRouter.get("/albums/:albumId", authUser, getAlbumById)

export default musicRouter