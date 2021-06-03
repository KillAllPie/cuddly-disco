let express = require('express');
let router = express.Router();
let db = require('better-sqlite3')('../users.db');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/', (req, res) => {
	if (!(req.body.username && req.body.password))
		res.render('/login', {error: 'Username or password not supplied'});

	if (db.prepare('SELECT password FROM userdata WHERE username = ?').get(req.body.username) != req.body.password) 
		res.render('/login', {error: 'User already exists'});

	
});

module.exports = router;
