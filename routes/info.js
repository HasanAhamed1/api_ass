const express = require("express")
const infoRoutes = express.Router();
const fs = require('fs');

const dataPath = "info.json"

// util functions
const saveInfoData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getInfoData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

// get all user infos from the json file
infoRoutes.get('/user/all', (req, res) => {
    const info = getInfoData()
    res.send(info)
  })

// post user infos
infoRoutes.post('/user/save', (req, res) => {
    var existInfos = getInfoData()
    const newInfoId = Math.floor(100000 + Math.random() * 900000);
    existInfos[newInfoId] = req.body;
    console.log(req.body);
    saveInfoData(existInfos);
    res.send("saved");
  })

// Update user infos
infoRoutes.put('/user/update/:id', (req, res) => {
  var existInfos = getInfoData()
  fs.readFile(dataPath, 'utf8', (err, data) => {
    const infoId = req.params['id'];
    existInfos[infoId] = req.body;
    saveInfoData(existInfos);
    res.send('updated')
  }, true);
});

// delete
infoRoutes.delete('/user/delete/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    var existInfos = getInfoData()
    const infoId = req.params['id'];
    delete existInfos[infoId]; 
    saveInfoData(existInfos);
    res.send('deleted')
  }, true);
})


module.exports = infoRoutes