// Dependencies
var ws = require('ws');
var filesystem = require('fs');
var path = require('path');
var express = require('express');
var md = require('marked');
var morgan = require('morgan');
var bodyparser = require('body-parser');

// Express setup
var dvna = express();
var port = process.env.PORT || 3000;

// Setup the vulnerability file path
var vulnerabilities = [], vulnerabilities_path = './vulnerabilities/';
filesystem.readdir(vulnerabilities_path, function (error, folders) {
  if (error) {
    throw error;
  }
  dvna.set('vulnerabilities', vulnerabilities);
  folders.map(function (folder) {
    return path.join(vulnerabilities_path, folder);
  }).filter(function (folder) {
    return !filesystem.statSync(folder).isFile();
  }).forEach(function (folder) {
    console.log("[+] Loaded challenge '%s'...",  folder);
  var vulnerability_id = path.basename(folder);
  var vulnerability_path = path.join(folder, 'vulnerability.js');
  var challenge_path = path.join(folder, 'challenge.md');
  var hint_path = path.join(folder, 'hint.md');
  var vulnerability = require('./' + vulnerability_path);
  var challenge = filesystem.readFileSync(challenge_path, 'utf8');
  var hint = filesystem.readFileSync(hint_path, 'utf8');
  vulnerability.id = vulnerability_id;
  vulnerability.path = vulnerability_id;
  vulnerability.challenge = challenge;
  vulnerability.hint = hint;
  vulnerabilities.push(vulnerability);
  });
  console.log('\nPress ctrl+c to shutdown the server');
});

// Setup the templating engine
dvna.set('view engine', 'jade');
dvna.use('/assets', express.static('public'));

// Setup loggers
dvna.use(bodyparser.urlencoded({ extended: true }));
dvna.use(morgan('combined'));

dvna.get('/', function (req, res) {
  var data = {
    vulnerabilities: vulnerabilities
  };
  res.render('dvna', data);
});

dvna.locals.md = md;

// Display the challenges
dvna.get('/:vulnerability/challenge', function (req, res) {
  var vulnerability = req.app.set('vulnerabilities').filter(function (vulnerability) {
    return vulnerability.path  === req.params.vulnerability;
  })[0];
  res.render('vulnerability', { challenge: vulnerability.challenge });
});

// Console interface
dvna.set('port', port);
dvna.listen(port, function welcome () {
  console.log("   ______            _        _______ ");
  console.log("  (  __  \\ |\\     /|( (    /|(  ___  )");
  console.log("  | (  \\  )| )   ( ||  \\  ( || (   ) |");
  console.log("  | |   ) || |   | ||   \\ | || (___) |");
  console.log("  | |   | |( (   ) )| (\\ \\) ||  ___  |");
  console.log("  | |   ) | \\ \\_/ / | | \\   || (   ) |");
  console.log("  | (__/  )  \\   /  | )  \\  || )   ( |");
  console.log("  (______/    \\_/   |/    )_)|/     \\|");
  console.log("\r\n   Damn Vulnerable Node Application ");
  console.log("  https://github.com/quantumfoam/dvna \r\n");
  console.log("dvna listening at: http://127.0.0.1:" + port + "/\n");
});
