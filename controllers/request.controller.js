import RequestModel from '../models/request.model.js'

export const createRequest = async (req, res) => {
    try {
        const doc = new RequestModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            address: req.body.address,
            notes: req.body.notes || undefined,
            doctor_id: req.body.doctor_id,
            book_time: req.body.book_time,
        })

        const request = await doc.save()

        res.json({
            ...request._doc,
        })
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create booking',
        })
    }
}

export const fetchAllRequests = async (req, res) => {
    try {
        const requests = await RequestModel.find({})
            .populate('doctor_id')
            .exec()

        res.json(requests)
    } catch (err) {
        res.status(500).json({
            error: 'Failed to find booking',
        })
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const request = await RequestModel.findByIdAndDelete(req.params.id)

        res.json(request)
    } catch (err) {
        res.status(500).json({
            error: 'Failed to delete booking',
        })
    }
}
