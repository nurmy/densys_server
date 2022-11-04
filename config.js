import 'dotenv/config'

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
    jwtExpires: '2h',
    mongoUri:
        process.env.MONGODB_URI ||
        process.env.MONGO_HOST ||
        'mongodb://' +
            (process.env.IP || 'localhost') +
            ':' +
            (process.env.MONGO_PORT || '27017') +
            '/densys',
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryKey: process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
}

export default config
