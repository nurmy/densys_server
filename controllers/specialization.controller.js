import SpecializationModel from './../models/specialization.model.js'

export const createSpecialization = async (req, res) => {
    try {
        const doc = new SpecializationModel({
            name: req.body.name,
            description: req.body.description,
        })

        const spec = await doc.save()

        res.json({
            ...spec._doc,
        })
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create specialization',
        })
    }
}

export const fetchAllSpecializations = async (req, res) => {
    try {
        let specs
        let options = {}
        if (req.query.search)
            options.name = {
                $regex: `${req.query.search}`,
                $options: 'i',
            }
        if (req.query.page) {
            specs = await SpecializationModel.find(options)
                .sort({ name: 1 })
                .skip((req.query.page - 1) * req.query.limit)
                .limit(req.query.limit)
        } else {
            specs = await SpecializationModel.find(options)
        }

        res.json(specs)
    } catch (err) {
        res.status(500).json({
            error: 'Failed to find specialization',
        })
    }
}

export const countSpecializations = async (req, res) => {
    try {
        let count
        let options = {}
        if (req.query.search)
            options.name = {
                $regex: `${req.query.search}`,
                $options: 'i',
            }
        if (req.query.page) {
            count = await SpecializationModel.find(options)
                .sort({ name: 1 })
                .countDocuments()
        } else {
            count = await SpecializationModel.find(options).countDocuments()
        }

        res.json(count)
    } catch (err) {
        res.status(500).json({
            error: 'Failed to find specialization',
        })
    }
}
