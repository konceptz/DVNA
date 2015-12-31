var express = require('express');
var DVNA = express();

DVNA.get('/', function(req, res) {
  var resp = eval("(" + req.query.target + ")");
  res.send('Parameter Value:</br>' + resp);
});

module.exports = {
  path: 'parameter_pollution',
  server: DVNA
}
