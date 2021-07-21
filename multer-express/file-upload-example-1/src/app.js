const express = require("express");

const path = require('path');

const cors = require('cors');

const app = express();

// Configuring app instance
app.use(express.json());
app.use(cors({
    origin: "*",
    methods : "GET,POST",
}));

const multer = require('multer');

//const upload = multer({ destination : 'static/uploads/'})
const upload = multer({ storage : multerStorage }); // A liitle bit more clean

const multerStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, "static");
    },
    filename : (req,file,cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileType = file.mimetype.split('/')[0];
        cb(null, `/uploads/${fileType}-${Date.now()}-${file.fieldname}.${fileExtension}`);
    }
})

app.post("/upload_files", upload.array("files"), uploadFiles);
function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    
    res.json({ message : "Successfully uploaded files! " })
}
app.listen(5000, () => {
    console.log(`Server started...`);
});