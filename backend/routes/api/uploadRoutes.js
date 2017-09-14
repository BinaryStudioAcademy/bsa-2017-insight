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
    req.finalName = finalName;
    req.fileName = fileName;
    req.fileType = fileType;
    cb(null, finalName);
  },
});

const upload = multer({ storage });

module.exports = function (app) {
  app.post('/api/uploads', upload.single('codename'), (req, res) => {
    const resp = {
      path: `${global.insightHost}/uploads/${req.finalName}`,
      fileType: req.fileType,
      fileName: req.fileName,
    };
    res.status(200).json(resp);
  });
};
