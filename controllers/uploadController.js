const fs = require('fs')
const cloudinary = require("cloudinary")

cloudinary.config({ 
   cloud_name: process.env.CLOUD_NAME, 
   api_key: process.env.CLOUD_API_KEY, 
   api_secret: process.env.CLOUD_API_SECRET 
});

exports.uploadImage = async (req,res)=>{
 try {
    const {path} = req.body
    const files = Object.values(req.files).flat()
    const image = []
    for (const file of files) {
      let url = await uploadToCloudinaty(file,path)
      image.push(url)
      removeFile(file.tempFilePath)
    }
    res.json(image)

    
 } catch (error) {
    res.status(401).json({
        message: error.message 
    })
 }
}


// upload to cloudinary function
const uploadToCloudinaty= async (file,path)=>{
  return new Promise((resolve)=>{
   cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {folder : path},
      (err,res)=>{
        if(err){
         removeFile(file.tempFilePath)
         return res.status(401).json({
            message: "file upload failed" 
        })
        }
        resolve({
         url : res.secure_url
        })
      }
   )
  })
}

const removeFile = (path)=>{
   fs.unlink(path, (err)=>{
     if(err) throw err
   })
 }