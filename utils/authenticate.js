import jwt from 'jsonwebtoken'
import config from '../config.js'

const authenticate = (req, res, next) => {
    const jwtToken = (req.headers.authorization || '')
        .replace('Bearer ', '')
        .trim()
    if (jwtToken) {
        try {
            const decodedInfo = jwt.verify(jwtToken, config.jwtSecret)
            req.body.role = decodedInfo.role
            next()
        } catch (err) {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } else {
        res.status(403).json({
            message: 'Insufficient info',
        })
    }
}
export default authenticate
