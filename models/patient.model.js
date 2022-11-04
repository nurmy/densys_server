import mongoose from 'mongoose'

const PatientSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date_of_birth: {
        type: Date,
        default: Date.now,
        // required: 'Date of birth is required',
    },
    iin: {
        type: String,
        required: 'IIN is required',
        unique: 'IIN must be unique',
        trim: true,
    },
    national_id_number: {
        type: String,
        required: 'National ID number is required',
        unique: 'National ID number must be unique',
        trim: true,
    },
    first_name: {
        type: String,
        required: 'First name is required',
        trim: true,
    },
    last_name: {
        type: String,
        required: 'Last name is required',
        trim: true,
    },
    middle_name: {
        type: String,
        required: 'Middle name is required',
        trim: true,
    },
    blood_group: {
        type: String,
        required: 'Blood group is required',
        trim: true,
    },
    emergency_contact: {
        type: String,
        required: 'Emergency contact number is required',
        trim: true,
    },
    contact_number: {
        type: String,
        required: 'Contact number is required',
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        default: 'noemail@err.err',
    },
    address: {
        type: String,
        required: 'Address is required',
        trim: true,
    },
    marital_status: {
        type: String,
        required: 'Marital statuses is required',
        trim: true,
    },
    registration_date: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('Patient', PatientSchema)
