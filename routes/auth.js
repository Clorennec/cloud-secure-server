const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const passport = require('passport');

const router = express.Router();

const CLIENT_ID = '1032672210266-m24bvok732iigjq3pfcqq4ip63r0mgs7.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const GITHUB_URL = "https://github.com/login/oauth/access_token";

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
