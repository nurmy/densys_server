import jwt from 'jsonwebtoken'
import config from './../config.js'

const generateJwt = (attributes) => {
    const token = jwt.sign(
        {
            ...attributes,
        },
        config.jwtSecret,
        {
            expiresIn: config.jwtExpires,
        }
    )
    return token
}

export default generateJwt
