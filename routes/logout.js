let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
	if (!(req.session.loggedin))
		return res.redirect('/');
	req.session.loggedin = false;
	req.session.username = '';
	res.redirect('/');
});

module.exports = router;
