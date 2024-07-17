const fs = require('fs')

exports.uploadImageMiddlewire = async (req, res, next) => {
    try {
        if (!req.files || Object.values(req.files).flat().length === 0) {
            return res.status(404).json({
                message: "No File Selected"
            })
        }
        file = Object.values(req.files).flat()
        file.forEach((files) => {
            if (files.mimetype !== 'image/jpeg' && files.mimetype !== 'image/jpg' && files.mimetype !== 'image/webp' && files.mimetype !== 'image/png' && files.mimetype !== 'image/gip') {
                removeFile(files.tempFilePath)
                return res.status(404).json({
                    message: "this image is not supported"
                })
            }
            if(files.size > 1024 * 1024 * 5){
                removeFile(files.tempFilePath)
                return res.status(404).json({
                    message: "image size is too large"
                })
            }
            next()

        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const removeFile = (path)=>{
  fs.unlink(path, (err)=>{
    if(err) throw err
  })
}