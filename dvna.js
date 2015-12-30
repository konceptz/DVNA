var fs = require('fs');
var path = require('path');
var express = require('express');

var DVNA = express();
var port = process.env.PORT || 6666;

var attacker = express();
var attacker_port = process.env.ATACKER_PORT || 6667;

var vulnerabilities = [];
var vulnerabilities_path = './vulnerabilities/';

fs.readdir(vulnerabilities_path, function (err, files) {
  if (err) {
    throw err;
  }

  files.map(function (file) {
    return path.join(vulnerabilities_path, file);
  }).filter(function (file) {
    return fs.statSync(file).isFile();
  }).forEach(function (file) {
    var plugin_path = vulnerabilities_path + path.basename(file, '.js');
    console.log("Loading vulnerability '%s'...",  plugin_path);
    var vulnerability = require(plugin_path);

    vulnerabilities.push(vulnerability);

    if (vulnerability.server) {
      console.log("Mounting it in '/%s'...",  vulnerability.path);
      DVNA.use('/' + vulnerability.path, vulnerability.server);
    }

    if (vulnerability.attacker) {
      console.log("Mounting attacker in '/%s'...",  vulnerability.path);
      attacker.use('/' + vulnerability.path, vulnerability.attacker);
    }
  });
});

DVNA.set('view engine', 'jade');

DVNA.get('/', function (req, res) {
  var data = {
    vulnerabilities: vulnerabilities
  };

  res.render('dvna', data);
})

attacker.set('port', attacker_port);
attacker.listen(attacker_port);

DVNA.set('port', port);
DVNA.listen(port, function welcome () {
  console.log("   ______            _        _______ ");
  console.log("  (  __  \\ |\\     /|( (    /|(  ___  )");
  console.log("  | (  \\  )| )   ( ||  \\  ( || (   ) |");
  console.log("  | |   ) || |   | ||   \\ | || (___) |");
  console.log("  | |   | |( (   ) )| (\\ \\) ||  ___  |");
  console.log("  | |   ) | \\ \\_/ / | | \\   || (   ) |");
  console.log("  | (__/  )  \\   /  | )  \\  || )   ( |");
  console.log("  (______/    \\_/   |/    )_)|/     \\|");

  console.log("\r\n   Damn Vulnerable Node Application ");

  console.log("  https://github.com/quantumfoam/DVNA \r\n");
  console.log("DVNA listening at: https://127.0.0.1:" + port + "/");
});
