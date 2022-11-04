import PatientModel from './../models/patient.model.js'

import {
    generateUsername,
    generatePassword,
} from './../utils/userAttributes.js'
import { registerUser, modifyUser } from './users.controller.js'

export const registerPatient = async (req, res) => {
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
                role: 'patient',
            }
            const user_details = await registerUser(attributes)
            const doc = new PatientModel({
                user_id: user_details._id,
                date_of_birth: req.body.birthDate || undefined,
                iin: req.body.iin,
                national_id_number: req.body.nationalIdNumber,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                middle_name: req.body.middleName,
                blood_group: req.body.bloodGroup,
                emergency_contact: req.body.emergencyContact,
                contact_number: req.body.contactNumber,
                email: req.body.email || undefined,
                address: req.body.address,
                marital_status: req.body.maritalStatus,
            })
            const patient = await doc.save()
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
            message: 'Failed to register a patient',
        })
    }
}

export const fetchAllPatients = async (req, res) => {
    try {
        if (req.body.role === 'admin') {
            const patients = await PatientModel.find({})
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

            patient.date_of_birth = req.body.birthDate || patient.date_of_birth
            patient.iin = req.body.iin || patient.iin
            patient.national_id_number =
                req.body.nationalIdNumber || patient.national_id_number
            patient.first_name = req.body.firstName || patient.first_name
            patient.last_name = req.body.lastName || patient.last_name
            patient.middle_name = req.body.middleName || patient.middle_name
            patient.blood_group = req.body.bloodGroup || patient.blood_group
            patient.emergency_contact =
                req.body.emergencyContact || patient.emergency_contact
            patient.contact_number =
                req.body.contactNumber || patient.contact_number
            patient.email = req.body.email || patient.email
            patient.address = req.body.address || patient.address
            patient.marital_status = req.body.maritalStatus || patient.marital

            await patient.save()

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
            message: 'Failed to modify patient info',
        })
    }
}
