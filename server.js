require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./config/passport");
const app = express();
const session = require("express-session");

app.use(
	session({
		secret: "cloud-secure-server", // Choisissez une clé secrète forte ici
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000, // Durée de vie du cookie en millisecondes (1 jour dans cet exemple)
			httpOnly: false, // Si true, le cookie n'est accessible que via le protocole HTTP
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://192.168.5.10:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

app.post('/deploy', isAuthenticated, (req, res) => {
  // Vous pouvez exécuter votre script de déploiement ici
  res.status(200).json({ message: 'Deployment successful' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));