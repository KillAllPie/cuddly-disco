let express = require('express');
let router = express.Router();
let db = require('better-sqlite3')('users.db');

router.get('/', (req, res) => {
	if (req.session.loggedin)
		return res.redirect('/');
	res.render('register', { error: false });
});

router.post('/', function(req, res) {
	if (!(req.body.username && req.body.password))
		return res.render('register', {error: 'Username or password not supplied'});

	if (db.prepare('SELECT id FROM userdata WHERE username = ?').get(req.body.username))
		return res.render('register', {error: 'User already exists'});

	db.prepare('INSERT INTO userdata (username, password) VALUES (?, ?)').run(req.body.username, req.body.password);
	res.redirect('/');
});

module.exports = router;
