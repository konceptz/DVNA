// TODO: Player has to terminate the process; code should be added to monitor, reward, and restart service

var express = require('express');
var DVNA = express();

DVNA.get('/', function(req, res) {
  var res = eval("("+req.query.e+")");
  res.send('Parameter eval():<br> ' + res);
});

module.exports = {
  path: 'eval_remote_code_execution',
  server: DVNA
}
