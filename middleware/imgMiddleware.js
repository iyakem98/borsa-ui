import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: function(req, file, cb) {  
         
        console.log(file)
        cb(null,Date.now()+'_'+file.originalname);
    }
})

export const  upload = multer({storage: storage})

