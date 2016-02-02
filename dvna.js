var ws = require('ws');
var fs = require('fs');
var path = require('path');
var express = require('express');
var md = require('marked');
var bodyParser = require('body-parser');

var challenge_token = require('./lib/challenge_token');

var DVNA = express();
var port = process.env.PORT || 3000;

var vulnerabilities = [];
var vulnerabilities_path = './vulnerabilities/';

fs.readdir(vulnerabilities_path, function (err, folders) {
  if (err) {
    throw err;
  }

  DVNA.set('vulnerabilities', vulnerabilities);

  folders.map(function (folder) {
    return path.join(vulnerabilities_path, folder);
  }).filter(function (folder) {
    return !fs.statSync(folder).isFile();
  }).forEach(function (folder) {
    console.log("Loading vulnerability '%s'...",  folder);

    var vulnerability_id = path.basename(folder);
    var vulnerability_path = path.join(folder, 'vulnerability.js');
    var challenge_path = path.join(folder, 'challenge.md');
    var hint_path = path.join(folder, 'hint.md');

    var vulnerability = require('./' + vulnerability_path);
    var challenge = fs.readFileSync(challenge_path, 'utf8');
    var hint = fs.readFileSync(hint_path, 'utf8');

    vulnerability.id = vulnerability_id;
    vulnerability.path = vulnerability_id;
    vulnerability.challenge = challenge;
    vulnerability.hint = hint;

    console.log("Generating challenge token for '%s'...",  vulnerability.id);
    vulnerability.challenge_token = challenge_token(vulnerability.id);

    vulnerabilities.push(vulnerability);

    if (vulnerability.server) {
      console.log("Mounting it in '/%s'...",  vulnerability.path);
      DVNA.use('/' + vulnerability.path, vulnerability.server);
    }
  });
});

DVNA.set('view engine', 'jade');
DVNA.use('/assets', express.static('public'));
DVNA.use(bodyParser.urlencoded({ extended: true }));

DVNA.get('/', function (req, res) {
  var data = {
    vulnerabilities: vulnerabilities
  };

  res.render('dvna', data);
});

DVNA.locals.md = md;

DVNA.get('/:vulnerability/challenge', function (req, res) {
  var vulnerability = req.app.set('vulnerabilities').filter(function (vulnerability) {
    return vulnerability.path  === req.params.vulnerability;
  })[0];

  res.render('vulnerability', {
    challenge: vulnerability.challenge
  });
});

DVNA.post('/:vulnerability/challenge', function (req, res) {
  var vulnerability = req.app.set('vulnerabilities').filter(function (vulnerability) {
    return vulnerability.path  === req.params.vulnerability;
  })[0];

  if (req.body.challenge_token === vulnerability.challenge_token) {
    vulnerability.passed = true;
  }

  res.redirect('/');
});

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
  console.log("DVNA listening at: http://127.0.0.1:" + port + "/");
});
