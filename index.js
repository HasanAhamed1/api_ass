const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/Routes');
app.use('/', routes);

app.get('/hero', (req, res) => {
    res.send('server is running');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});