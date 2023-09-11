const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage });  // a Multer middleware instance called upload using the previously configured storage settings. This middleware is used to handle file uploads.


app.post('/upload', upload.single('file'), (req, res) => {
    // handle uploaded file here ,i.e display metadata 
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, mimetype, size } = req.file;

    const fileInfo = {
        name: originalname,
        type: mimetype,
        size: size,
    };

    res.json(fileInfo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});