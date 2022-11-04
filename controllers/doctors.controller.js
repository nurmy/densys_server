import DoctorModel from './../models/doctor.model.js'

import {
    generateUsername,
    generatePassword,
} from './../utils/userAttributes.js'
import { registerUser, modifyUser } from './users.controller.js'

export const registerDoctor = async (req, res) => {
    try {
        if (req.body.role === 'admin') {
            const attributes = {
                username:
                    req.body.username ||
                    (await generateUsername({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                    })),
                password: req.body.password || generatePassword(),
                role: 'doctor',
            }
            const user_details = await registerUser(attributes)
            const doc = new DoctorModel({
                user_id: user_details._id,
                date_of_birth: req.body.birthDate || undefined,
                iin: req.body.iin,
                national_id_number: req.body.nationalIdNumber,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                middle_name: req.body.middleName,
                contact_number: req.body.contactNumber,
                experience: req.body.experience,
                photo_url: req.body.photoUrl,
                category: req.body.category,
                appointment_price: req.body.appointmentPrice,
                degree: req.body.degree,
                rating: req.body.rating,
                address: req.body.address,
                homepage_url: req.body.homepageUrl || undefined,
            })
            const doctor = await doc.save()
            res.json({
                ...doctor._doc,
            })
        } else {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Failed to register a doctor',
        })
    }
}

export const fetchAllDoctors = async (req, res) => {
    try {
        if (req.body.role === 'admin') {
            const doctors = await DoctorModel.find({})
            res.json(doctors)
        } else {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch doctors info',
        })
    }
}

export const fetchDoctor = async (req, res) => {
    try {
        if (req.body.role === 'admin') {
            const doctor = await DoctorModel.findOne({
                user_id: req.params.id,
            })
            res.json({
                ...doctor._doc,
            })
        } else {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch doctor info',
        })
    }
}

export const modifyDoctor = async (req, res) => {
    try {
        if (req.body.role === 'admin') {
            const user = await modifyUser({
                user_id: req.params.id,
                username: req.body.username || undefined,
                password: req.body.password || undefined,
            })
            if (user.error) {
                console.log(user.error)
                throw new Error()
            }
            const doctor = await DoctorModel.findOne({
                user_id: req.params.id,
            })

            doctor.date_of_birth = req.body.birthDate || doctor.date_of_birth
            doctor.iin = req.body.iin || doctor.iin
            doctor.national_id_number =
                req.body.nationalIdNumber || doctor.national_id_number
            doctor.first_name = req.body.firstName || doctor.first_name
            doctor.last_name = req.body.lastName || doctor.last_name
            doctor.middle_name = req.body.middleName || doctor.middle_name
            doctor.contact_number =
                req.body.contactNumber || doctor.contact_number
            doctor.experience = req.body.experience || doctor.experience
            doctor.photo_url = req.body.photoUrl || doctor.photo_url
            doctor.category = req.body.category || doctor.category
            doctor.appointment_price =
                req.body.appointmentPrice || doctor.appointment_price
            doctor.degree = req.body.degree || doctor.degree
            doctor.rating = req.body.rating || doctor.rating
            doctor.address = req.body.address || doctor.address
            doctor.homepage_url = req.body.homepageUrl || doctor.homepage_url

            await doctor.save()

            res.json({
                ...doctor._doc,
            })
        } else {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Failed to modify doctor info',
        })
    }
}
