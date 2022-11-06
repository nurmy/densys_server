import PatientModel from './../models/patient.model.js'

import {
    generateUsername,
    generatePassword,
} from './../utils/userAttributes.js'
import { registerUser, fetchUser, modifyUser } from './users.controller.js'

export const registerPatient = async (req, res) => {
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
                role: 'patient',
            }
            const user_details = await registerUser(attributes)
            const doc = new PatientModel({
                user_id: user_details._id,
                date_of_birth: req.body.date_of_birth,
                iin: req.body.iin,
                national_id_number: req.body.national_id_number,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                middle_name: req.body.middle_name,
                blood_group: req.body.blood_group,
                emergency_contact: req.body.emergency_contact,
                contact_number: req.body.contact_number,
                email: req.body.email || undefined,
                address: req.body.address,
                marital_status: req.body.marital_status,
            })
            const patient = await doc.save()
            const user = await fetchUser({ user_id: patient.user_id })
            res.json({
                ...patient._doc,
                user_id: user,
            })
        } else {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Failed to register a patient',
        })
    }
}

export const fetchAllPatients = async (req, res) => {
    try {
        if (req.body.role === 'admin') {
            const patients = await PatientModel.find({})
                .populate('user_id')
                .exec()
            res.json(patients)
        } else {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch patients info',
        })
    }
}

export const fetchPatient = async (req, res) => {
    try {
        if (req.body.role === 'admin') {
            const patient = await PatientModel.findOne({
                user_id: req.params.id,
            })
            res.json({
                ...patient._doc,
            })
        } else {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch patient info',
        })
    }
}

export const modifyPatient = async (req, res) => {
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
            const patient = await PatientModel.findOne({
                user_id: req.params.id,
            })

            patient.date_of_birth =
                req.body.date_of_birth || patient.date_of_birth
            patient.iin = req.body.iin || patient.iin
            patient.national_id_number =
                req.body.national_id_number || patient.national_id_number
            patient.first_name = req.body.first_name || patient.first_name
            patient.last_name = req.body.last_name || patient.last_name
            patient.middle_name = req.body.middle_name || patient.middle_name
            patient.blood_group = req.body.blood_group || patient.blood_group
            patient.emergency_contact =
                req.body.emergency_contact || patient.emergency_contact
            patient.contact_number =
                req.body.contact_number || patient.contact_number
            patient.email = req.body.email || patient.email
            patient.address = req.body.address || patient.address
            patient.marital_status =
                req.body.marital_status || patient.marital_status

            await patient.save()

            res.json({
                ...patient._doc,
                user_id: user,
            })
        } else {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Failed to modify patient info',
        })
    }
}
