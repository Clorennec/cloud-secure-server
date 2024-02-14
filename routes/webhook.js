const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

// Route pour recevoir le webhook GitHub pour le déploiement du backend
router.post('/github/deploy/back', (req, res) => {
    exec(`sh /opt/app/back/scripts/deploy-back.sh`, (stdout, stderr) => {
        console.log('Output du déploiement du backend:', stdout);
        console.error('Erreurs du déploiement du backend:', stderr);
    });
    res.sendStatus(200);
});

// Route pour recevoir le webhook GitHub pour le déploiement du frontend
router.post('/github/deploy/front', (req, res) => {
    exec(`sh /opt/app/front/scripts/deploy-front.sh`, (stdout, stderr) => {
        console.log('Output du déploiement du frontend:', stdout);
        console.error('Erreurs du déploiement du frontend:', stderr);
    });
    res.sendStatus(200);
});

module.exports = router;
