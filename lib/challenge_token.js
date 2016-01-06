var crypto = require('crypto');
var tokens = {};

function challenge (name) {
  var token = crypto.randomBytes(64).toString('hex')

  return tokens[name] = tokens[name] || token;
}

module.exports = challenge;
