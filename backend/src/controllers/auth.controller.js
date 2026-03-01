import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrpt from 'bcryptjs'

export const registerUser = async (req, res) => {
    const {username, email, password, role = "user"} = req.body;

    const userAlreadyExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(userAlreadyExist) {
        return res.status(409).json({
            message: "User already exist"
        })
    }

    const hash = await bcrpt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role,

    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            hashPass: hash,
            originalPass: password
        }
    })
}

export const loginUser = async (req, res) => {
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(!user) {
        return res.status(401).json({message: "Invalid crecidentials"})
    }

    const isPasswordValid = await bcrpt.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(401).json({message: "Invalid crecidentials"})
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}