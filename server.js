require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./config/passport");
const app = express();
const session = require("express-session");
const Docker = require("dockerode");
const api = require("./routes/api");

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
		origin: "http://localhost:3030",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);

app.use("/api", isAuthenticated, api);

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

app.post('/deploy', (req, res) => {
  // Vous pouvez exécuter votre script de déploiement ici
  res.status(200).json({ message: 'Deployment successful' });
});

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

// Route pour vérifier l'état des conteneurs Docker
app.get('/api/checkContainers', async (req, res) => {
    try {
        // Liste tous les conteneurs en cours d'exécution
        const containers = await docker.listContainers({ all: true });

        // Filtrer les conteneurs pour ceux qui sont en cours d'exécution
        const runningContainers = containers.filter(container => container.State === 'running');

        // Renvoyer les noms des conteneurs en cours d'exécution
        const runningContainerNames = runningContainers.map(container => container.Names);

        // Renvoyer les noms des conteneurs en tant que réponse
        res.json({ runningContainers: runningContainerNames });
    } catch (error) {
        console.error('Error checking container status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
