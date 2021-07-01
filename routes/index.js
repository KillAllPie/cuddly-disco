let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express', username: req.session.loggedin ? req.session.username : false });
});

module.exports = router;
