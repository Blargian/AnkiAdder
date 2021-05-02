const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const helpers = require('../models/dbHelpers');

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

  //console.log(req.body);
  var spawn = require("child_process").spawn;

  var py = spawn('python',["-u",path.join(__dirname, "anki_service.py")]);

  py.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

}

app.listen(port, () => {
    console.log('Server is up!');
});