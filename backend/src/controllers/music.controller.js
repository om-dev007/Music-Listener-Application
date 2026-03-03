import { musicModel } from "../models/music.model.js";
import jwt from 'jsonwebtoken'
import { uploadFile } from "../services/storage.service.js";
import { albumModel } from "../models/album.model.js";

export const createMusic = async (req, res) => {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const uri = result.url;

    if (!uri) {
        return res.status(500).json({ message: "Upload failed, no URL" });
    }

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
    });

    return res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            title: music.title,
            uri: music.uri,
            artist: music.artist,
        },
    });

};

export const createAlbum = async (req, res) => {

    const { title, musics } = req.body

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics
    })

    return res.status(201).json({
        message: "Album created successfully",
        album: {
            id: req.user._id,
            title: album.title,
            artist: album.artist,
            music: album.musics
        }
    })
}

export const getAllMusic = async (req, res) => {
    const music = await musicModel.find()
    .skip(1)
    .limit(2)
    .populate("artist", "username email");

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: music
    })
}

export const getAllAlbums = async (req, res) => {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email")

    return res.status(200).json({
        message: "Fetched all album successfully",
        albums: albums
    })
}

export const getAlbumById = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

    return res.status(200).json({
        message: "Album fetched successfully by Id",
        album: album
    })
}