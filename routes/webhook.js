const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

// Route pour recevoir le webhook GitHub pour le déploiement du backend
router.post('/github/deploy/back', (req, res) => {
    exec(`sh /opt/app/front/scripts/deploy-back.sh`);
    res.sendStatus(200);
});

// Route pour recevoir le webhook GitHub pour le déploiement du frontend
router.post('/github/deploy/front', (req, res) => {
    exec(`sh /opt/app/front/scripts/deploy-front.sh`);
    res.sendStatus(200);
});

module.exports = router;