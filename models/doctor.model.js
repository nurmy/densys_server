import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date_of_birth: {
        type: Date,
        // required: 'Date of birth is required',
        default: Date.now,
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
    contact_number: {
        type: String,
        required: 'Contact number is required',
        trim: true,
    },
    experience: {
        type: Number,
        required: 'Years of experience is required',
    },
    photo_url: {
        type: String,
        required: 'Photo of the doctor is required',
        trim: true,
    },
    category: {
        type: String,
        required: `Doctor's category is required`,
        trim: true,
    },
    appointment_price: {
        type: Number,
        required: 'Price per appointment is required',
    },
    // schedule: {
    //     type: [
    //         {
    //             day: {
    //                 type: String,
    //                 trim: true,
    //             },
    //             hours: {
    //                 start: Date,
    //                 end: Date,
    //             },
    //         },
    //     ],
    // },
    degree: {
        type: String,
        required: 'Degree level is required',
        trim: true,
    },
    rating: {
        type: Number,
        required: `Doctor's rating is required`,
    },
    address: {
        type: String,
        required: 'Address is required',
        trim: true,
    },
    homepage_url: {
        type: String,
        default: 'No homepage',
        trim: true,
    },
})

export default mongoose.model('Doctor', DoctorSchema)
