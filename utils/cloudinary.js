import config from './../config.js'
import { v2 } from 'cloudinary'

v2.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryKey,
    api_secret: config.cloudinarySecret,
})

export default v2
