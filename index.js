const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  res.json({"name" : req.file.originalname, 
            "type" : req.file.mimetype,
            "size" : req.file.size,
             })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
