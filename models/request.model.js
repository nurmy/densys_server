import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: 'No notes',
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: 'Doctor ID is required',
    },
    book_time: {
        type: Date,
        required: 'Book time is required',
    },
})

export default mongoose.model('Request', RequestSchema)
