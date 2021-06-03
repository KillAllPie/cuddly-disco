let express = require('express');
let router = express.Router();
let db = require('better-sqlite3')('../users.db');

router.get('/', (req, res) => {
	res.render('register');
});

router.post('/', function(req, res, next) {
	if (!(req.body.username && req.body.password)) res.render('/register', {error: 'Username or password not supplied'});

	if (db.prepare('SELECT id FROM userdata WHERE username = ?').get(req.body.username)) res.render('/register', {error: 'User already exists'});

	db.prepare('INSERT INTO userdata (username, password) VALUES (?, ?)').get(req.body.username, req.body.password);
	res.redirect('/login');
});

module.exports = router;
