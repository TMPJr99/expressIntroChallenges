var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8000;


app.post('/create/:name/:age', function(req, res) {

  var newId = 0;
  let data = fs.readFileSync("./storage.json", "utf8")
    let newData = JSON.parse(data)


  var newUser = [{
    name: req.params.name,
    id: newData.length,
    age: parseInt(req.params.age)
  }]

  fs.readFile("./storage.json", "utf8", (err, data) => {
    if (data.includes("[")) {
      let newData = JSON.parse(data)
      newData.push(newUser[0])
      fs.writeFileSync('./storage.json', JSON.stringify(newData));
    } else {
      fs.writeFileSync('./storage.json', JSON.stringify(newUser))
    }
  })
  res.json(newUser)
  res.json(newUser)
});

app.get('/', (req, res) => {
  res.send(json)
})

app.get('/:id', (req, res) => {
  fs.readFile('./storage.json', 'utf8', (err, data) => {
    let pData = JSON.parse(data)
    let match = pData.filter((item) => {
      return item.id == req.params.id;
    })

    if (match.length >= 1) {
      res.json(match[0])
    } else {
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
