import DoctorModel from './../models/doctor.model.js'
import mongoose from 'mongoose'

import {
    generateUsername,
    generatePassword,
} from './../utils/userAttributes.js'
import { registerUser, fetchUser, modifyUser } from './users.controller.js'

export const registerDoctor = async (req, res) => {
    try {
        if (req.body.role === 'admin') {
            const attributes = {
                username:
                    req.body.username ||
                    (await generateUsername({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                    })),
                password: req.body.password || generatePassword(),
                role: 'doctor',
            }
            const user_details = await registerUser(attributes)
            const doc = new DoctorModel({
                user_id: user_details._id,
                department_id: req.body.department_id,
                spec_id: new mongoose.Types.ObjectId(req.body.spec_id),
                date_of_birth: req.body.date_of_birth,
                iin: req.body.iin,
                national_id_number: req.body.national_id_number,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                middle_name: req.body.middle_name,
                contact_number: req.body.contact_number,
                experience: req.body.experience,
                photo_url: req.body.photo_url,
                category: req.body.category,
                schedule: req.body.schedule,
                appointment_price: req.body.appointment_price,
                degree: req.body.degree,
                rating: req.body.rating,
                address: req.body.address,
                homepage_url: req.body.homepage_url || undefined,
            })
            const doctor = await doc.save()
            const user = await fetchUser({ user_id: doctor.user_id })
            res.json({
                ...doctor._doc,
                user_id: user,
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
        const options = {}
        if (req.params.spec_id) options.spec_id = req.params.spec_id
        if (req.query.search) {
            options['first_name'] = {
                $regex: `${req.query.search}`,
                $options: 'i',
            }
            options['second_name'] = {
                $regex: `${req.query.search}`,
                $options: 'i',
            }
        }
        if (req.body.role === 'admin' || req.body.role === 'patient') {
            let doctors
            if (req.query.page) {
                doctors = await DoctorModel.find(options)
                    .sort([
                        ['first_name', 1],
                        ['last_name', 1],
                    ])
                    .skip((req.query.page - 1) * req.query.limit)
                    .limit(req.query.limit)
                    .populate('user_id')
                    .exec()
            } else {
                doctors = await DoctorModel.find(options)
                    .populate('user_id')
                    .exec()
            }
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

export const countDoctors = async (req, res) => {
    try {
        const options = {}
        if (req.params.spec_id) options.spec_id = req.params.spec_id
        if (req.query.search) {
            options['first_name'] = {
                $regex: `${req.query.search}`,
                $options: 'i',
            }
            options['second_name'] = {
                $regex: `${req.query.search}`,
                $options: 'i',
            }
        }
        if (req.body.role === 'admin' || req.body.role === 'patient') {
            let count
            if (req.query.page) {
                count = await DoctorModel.find(options)
                    .sort([
                        ['first_name', 1],
                        ['last_name', 1],
                    ])
                    .countDocuments()
            } else {
                count = await DoctorModel.find(options).countDocuments()
            }
            res.json(count)
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

            doctor.date_of_birth =
                req.body.date_of_birth || doctor.date_of_birth
            doctor.iin = req.body.iin || doctor.iin
            doctor.department_id =
                req.body.department_id || doctor.department_id
            doctor.spec_id = req.body.spec_id || doctor.spec_id
            doctor.schedule = req.body.schedule || doctor.schedule
            doctor.national_id_number =
                req.body.national_id_number || doctor.national_id_number
            doctor.first_name = req.body.first_name || doctor.first_name
            doctor.last_name = req.body.last_name || doctor.last_name
            doctor.middle_name = req.body.middle_name || doctor.middle_name
            doctor.contact_number =
                req.body.contact_number || doctor.contact_number
            doctor.experience = req.body.experience || doctor.experience
            doctor.photo_url = req.body.photo_url || doctor.photo_url
            doctor.category = req.body.category || doctor.category
            doctor.appointment_price =
                req.body.appointment_price || doctor.appointment_price
            doctor.degree = req.body.degree || doctor.degree
            doctor.rating = req.body.rating || doctor.rating
            doctor.address = req.body.address || doctor.address
            doctor.homepage_url = req.body.homepage_url || doctor.homepage_url

            await doctor.save()
            res.json({
                ...doctor._doc,
                user_id: user,
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
