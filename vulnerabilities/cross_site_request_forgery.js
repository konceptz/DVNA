var express = require('express');
var app = express();

app.post('/users/1/delete', function(req, res){
  console.log('Account deleted succesfully');
  res.send('Account deleted succesfully');
})

app.listen(6666);

var app_attacker = express();

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('csrf', { title: 'Cross Site Request Forgery', message: 'Deleting in 3 seconds a user in another domain!'});
})

app.listen(6667);
