import bcrypt from 'bcrypt'
import generateJwt from './../utils/generateJwt.js'
import hashPassword from './../utils/hashPassword.js'

import UserModel from './../models/user.model.js'

export const signup = async (req, res) => {
    try {
        const hashedPassword = await hashPassword(req.body.password)

        const doc = new UserModel({
            username: req.body.username,
            hashed_password: hashedPassword,
            role: req.body.role,
        })

        const user = await doc.save()

        const token = generateJwt({
            _id: user._doc._id,
            role: user._doc.role,
        })

        res.json({
            ...user._doc,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to sign up an user',
        })
    }
}

export const signin = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            username: req.body.username,
        })

        if (!user) {
            res.status(401).json({
                message: 'Such username does not exist',
            })
        }

        const authorized = await bcrypt.compare(
            req.body.password,
            user._doc.hashed_password
        )
        if (!authorized) {
            res.status(401).json({
                message: 'Incorrect password',
            })
        }

        const token = generateJwt({
            _id: user._doc._id,
            role: user._doc.role,
        })

        res.json({
            ...user._doc,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to sign in',
        })
    }
}
