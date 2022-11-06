import cloudinary from '../utils/cloudinary.js'

export const uploadPhoto = async (req, res) => {
    try {
        const fileStr = req.body.data
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        })
        console.log(uploadResponse)
        res.json({
            url: uploadResponse.url,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
