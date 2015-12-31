var exe = require("child_process");
var express = require('express');
var DVNA = express();

DVNA.get('/', function(req, res) {
  res.writeHead(200, {"Content-Type" : "text/html"});
  exe.exec('id', function(err, data) {
    res.write(":~/$ " + data);
    console.log(data);
    res.end();
  });
});

module.exports = {
  path: 'command_injection',
  server: DVNA
}
