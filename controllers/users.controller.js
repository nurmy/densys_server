import hashPassword from '../utils/hashPassword.js'
import UserModel from './../models/user.model.js'

export const registerUser = async (attributes) => {
    try {
        const doc = new UserModel({
            username: attributes.username,
            hashed_password: await hashPassword(attributes.password),
            role: attributes.role,
        })

        const user = await doc.save()

        return {
            ...user._doc,
        }
    } catch (err) {
        console.log(err)
        return {
            error: 'Failed to sign up an user',
        }
    }
}

export const fetchUser = async (attributes) => {
    try {
        const user = await UserModel.findById(attributes.user_id)

        if (!user) {
            return {
                error: 'Such username does not exist',
            }
        }

        return {
            ...user._doc,
        }
    } catch (err) {
        console.log(err)
        return {
            error: 'Failed to find user',
        }
    }
}

export const modifyUser = async (attributes) => {
    try {
        const user = await UserModel.findById(attributes.user_id)
        if (!user) {
            return {
                error: 'Such username does not exist',
            }
        }

        if (attributes.username) user.username = attributes.username
        if (attributes.password)
            user.hashed_password = await hashPassword(attributes.password)

        await user.save()
        return user._doc
    } catch (err) {
        console.log(err)
        return {
            error: 'Failed to find user',
        }
    }
}
