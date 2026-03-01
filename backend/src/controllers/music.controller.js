import { musicModel } from "../models/music.model.js";
import jwt from 'jsonwebtoken'
import { uploadFile } from "../services/storage.service.js";

export const createMusic = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized for token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res
                .status(403)
                .json({ message: "You don't have access to create music" });
        }

        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString("base64"));

        console.log("upload result: ", result)
        console.log(req.file);

        const uri = result.url;

        if (!uri) {
            return res.status(500).json({ message: "Upload failed, no URL" });
        }

        const music = await musicModel.create({
            url: result.url,
            title,
            artist: decoded.id,
        });

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                title: music.title,
                uri: music.url,
                artist: music.artist,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized for other error" });
    }
};
