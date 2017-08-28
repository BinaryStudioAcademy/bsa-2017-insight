const multer = require('multer');

const path = `${__dirname}/../../../uploads`;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path);
  },
  filename(req, file, cb) {
    const splittedFilename = file.originalname.split('.');
    const [fileName, fileType] = splittedFilename;
    const finalName = `${fileName}-${Date.now()}.${fileType}`;
    cb(null, finalName);
  },
});

const upload = multer({ storage });

module.exports = function (app) {
  app.post('/api/uploads', upload.array('codename'), (req, res) => {
    const filesArr = req.files;
    const resp = filesArr.map((file) => {
      return {
        originalName: file.originalname,
        filename: file.filename,
        fileType: file.filename.split('.')[1],
        path: `http://localhost:3000/uploads/${file.filename}`,
      };
    });
    res.status(200).json(resp);
  });
};
