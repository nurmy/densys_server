import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: 'Username must be unique',
        trim: true,
    },
    hashed_password: {
        type: String,
        required: 'Password is required',
    },
    role: {
        type: String,
        required: 'Role is required',
        trim: true,
    },
})

export default mongoose.model('User', UserSchema)
