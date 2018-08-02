var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8000;

app.post('/create/:name/:age', function(req, res) {
  var obj = {
    name: req.params.name,
    age: parseInt(req.params.age)
  }
  fs.writeFileSync('./storage.json', JSON.stringify([]))
  fs.readFile('./storage.json', 'utf8', function(err, data){
    let arr = JSON.parse(data)

    arr.push(obj);

    fs.writeFile('./storage.json', JSON.stringify(arr), function(err) {
      res.sendStatus(200)
    })
  })
});

app.get('/', (req, res) => {
  res.send(json)
})

app.get('/:name', (req, res) => {
  fs.readFile('./storage.json', 'utf8', (err, data) => {
    let pData = JSON.parse(data)
    let match = pData.filter((item) => {
      return item.name == req.params.name;
    })

    if(match.length >= 1){
      res.json(match[0])
    }else{
      res.sendStatus(400)
    }
  });
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
