var express = require('express');
var DVNA = express();

// TODO: This bug class should be included; currently failing.
DVNA.get("/redirect", function(req, res, next) {
  return res.redirect(req.query.redirect_url);
});

module.exports = {
  path: 'invalid_redirects',
  server: DVNA
}
