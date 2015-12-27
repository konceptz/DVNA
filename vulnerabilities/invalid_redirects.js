var e = require("express");
var DVNA = e();

// TODO: This bug class should be included; currently failing.
DVNA.get("/redirect", function(req, res, next) {
  return res.redirect(req.query.redirect_url);
});
DVNA.listen(6666);
