var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8000;

app.get('/hello', function(req, res) {
  res.send("Hello!");
});

app.post('/create/:name', (req, res) => {
  let obj = { id:1, name:req.params.name};
  res.send(obj)
})

app.get('/', (req, res) => {
  let index = fs.readFileSync('./index.html', 'utf8');
  res.send(index);
})

app.get('/verify/:age', (req, res) => {
  if(req.params.age > 13){
    res.sendStatus(200)
  }else{
    res.sendStatus(403)
  }
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
