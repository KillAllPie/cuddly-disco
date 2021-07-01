let express = require('express');
let router = express.Router();
let db = require('better-sqlite3')('users.db');

/* GET home page. */
router.get('/', function(req, res) {
	if (req.session.loggedin)
		return res.redirect('/');
	res.render('login', { error: false });
});

router.post('/', (req, res) => {
	if (!(req.body.username && req.body.password))
		return res.render('login', {error: 'Username or password not supplied'});

	console.log(db.prepare('SELECT password FROM userdata WHERE username = ?').get(req.body.username), req.body.password, db.prepare('SELECT password FROM userdata WHERE username = ?').get(req.body.username) != req.body.password);
	if ((db.prepare('SELECT password FROM userdata WHERE username = ?').get(req.body.username)).password != req.body.password) 
		return res.render('login', {error: 'Wrong password'});

	req.session.loggedin = true;
	req.session.username = req.body.username;
	res.redirect('/');
});

module.exports = router;
