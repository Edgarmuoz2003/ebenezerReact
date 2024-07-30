const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        cb(null, 'uploadedImages/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Usar la extensión original del archivo
      },
})

const upload = multer({ storage: storage });

module.exports = upload;