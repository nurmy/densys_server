import UserModel from './../models/user.model.js'
import { v4 } from 'uuid'

export const generateUsername = async ({ first_name, last_name }) => {
    let username = `${first_name}.${last_name}`.toLowerCase()
    let user = await UserModel.findOne({
        username: username,
    })
    while (user) {
        username += `${Math.floor(Math.random() * 10)}`
        user = await UserModel.findOne({
            username: username,
        })
    }
    return username
}

export const generatePassword = () => {
    const password = `${v4().slice(9, 13)}${v4().slice(14, 18)}${v4().slice(
        19,
        23
    )}`
    console.log(password)
    return password
}
