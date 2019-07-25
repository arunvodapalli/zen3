var express = require('express');
var router = express.Router();
var fs = require('fs');
var Path = require('path');
const path = './files/';
fs.mkdir('files', (e,r) => {});

router.get('/create-env/:process/:key/:value', (req, res) => {
    const data = req.params;
    if (data.process) {

        let file = path + data.process + '.env';

        if (fs.existsSync(file)) {
            res.json({
                success: false,
                message: 'File already exist'
            })
        } else {
            var content = `${data.key} = ${data.value}`;
            fs.writeFile(file, content, (err, success) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err.message
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'File created successfully'
                    })
                }
            })
        }
    } else {
        res.json({
            success: false,
            message: 'No process name received'
        })
    }
})

router.get('/get-env/:process', (req, res) => {
    const data = req.params;
    
    if (data.process) {
        data.process = data.process.replace(".env","")
        let file = path + data.process + '.env';
        var processData;

        if (fs.existsSync(file)) {

            var readStream = fs.createReadStream(file);

            readStream.setEncoding('UTF8');

            readStream.on('data', function (chunk) {

                processData = chunk

            });

            readStream.on('end', function (chunk) {

                res.json({
                    success: true,
                    message: processData
                })

            });

            readStream.on('error', function (e) {

                res.json({
                    success: false,
                    message: err.stack
                })

            });
        } else {
            res.json({
                success: false,
                message: 'No process found'
            })
        }
    } else {
        res.json({
            success: false,
            message: 'No process name received'
        })
    }
})


router.get('/get-files', async (req, res) => {
    const dir = Path.join(__dirname, '../files');
    console.log(dir)
    var data = []
    fs.readdir(dir, function (err, files) {
        if (err) {
            res.json({
                success: false,
                message: err.message
            })
        } else {
            files.forEach(function (file) {
                data.push(file);
            });
            res.json({
                success: true,
                message: data
            })
        }
    });
})
module.exports = router;
