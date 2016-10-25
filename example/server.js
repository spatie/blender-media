"use strict";

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: path.join(__dirname, 'temp') });

app.use(express.static(__dirname));

let currentId = 3;

app.post('/upload', upload.any(), (req, res) => {

    const data = req.files.map(file => {

        const id = currentId++;

        return {
            id: id,
            name: file.originalname,
            fileName: file.originalname,
            customProperties: {},
            orderColumn: id,
            thumbUrl: `/temp/${file.filename}`,
            originalUrl: `/temp/${file.filename}`,
            collection: Array.isArray(req.body.collection_name) ?
                req.body.collection_name[0] : req.body.collection_name,
        };
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

app.listen(4000);

console.log('Server running at http://localhost:4000');
