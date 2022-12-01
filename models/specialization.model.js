import mongoose from 'mongoose'

const SpecializationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        unique: 'Name must be unique',
        trim: true,
    },
    description: {
        type: String,
        required: 'Description is required',
        trim: true,
    },
})

export default mongoose.model('Specialization', SpecializationSchema)
