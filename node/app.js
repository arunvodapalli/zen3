var express = require('express');
var cors = require('cors');
var app = express();
const port = 8464;

const files = require('./routes/files');

app.use(cors());

app.use('/files',files);

app.get('/',(req,res) => {
    res.send('Hello from Api');
})

app.listen(port, function () {
    console.log(`Server running at ${port}`);
})