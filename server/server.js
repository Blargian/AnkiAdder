const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const helpers = require('../models/dbHelpers');
const { exception } = require('console');
const https = require('https');

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

//Looks for the search word in the database
app.get('/api/:word',(req,res) => {
  helpers.fetchWord(req.params.word).then((result) => {
    res.status(200).json(result);
  }).catch((error)=>{
    console.log(error)
    res.status(400).send('Could not fetch the word')
  })
})

//Look for the translation of the word given the word id
app.get('/api/translate/:id',(req,res)=>{
  helpers.fetchTranslation(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((error)=>{
    console.log(error);
    res.status(400).send('Could not fetch the translation');
  })
})

app.post('/add',interfaceAnki);
//Function which passes the JSON to anki itself through python
function interfaceAnki(req,res) {

  const launchPython = () => {
    console.log("launching python child process");
    var spawn = require("child_process").spawn;
    var py = spawn(path.join(__dirname, "../scripts/env/Scripts/python"),["-u",path.join(__dirname, "../scripts/anki_service.py")]);

    py.stdout.on('data', function(data) {
      console.log(data.toString());
    });

    py.stderr.on('data', function (data){
      console.log(data.toString());
    });
  }

  fs.writeFile(path.join(__dirname, "../scripts/datasource.json"), JSON.stringify(req.body),{encoding: 'utf8'},launchPython);  
  res.json({ msg: 'success' });  
}

//Deprecated - to be done from python
const downloadAudio = (url,word) => {
  const file = fs.createWriteStream(path.join(__dirname, "../scripts/downloads/")+`${word}.mp3`);
  const request = https.get(`${url}`, function(response) {
    response.pipe(file);
  });
}

//Deprecated - to be done from python
const downloadImage = (url,word) => {
  const file = fs.createWriteStream(path.join(__dirname, "../scripts/downloads/")+`${word}.jpg`);
  const request = https.get(`${url}`, function(response) {
    response.pipe(file);
  });
}

app.listen(port, () => {
    console.log('Server is up!');
});