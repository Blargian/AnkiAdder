const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const helpers = require('../models/dbHelpers');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

app.get('/api/:word',(req,res) => {
  console.log(req.params.word)
  helpers.fetchWord(req.params.word).then((result) => {
    res.status(200).json(result);
  }).catch((error)=>{
    console.log(error)
    res.status(400).send('Could not fetch the word')
  })
})

app.listen(port, () => {
    console.log('Server is up!');
});