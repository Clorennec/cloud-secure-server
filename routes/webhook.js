const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

// Route pour recevoir le webhook GitHub pour le déploiement du backend
router.post('/github/deploy/back', (req, res) => {
    const deployProcess = exec(`sh /opt/app/back/scripts/deploy-back.sh`);
    
    deployProcess.stdout.on('data', data => {
        console.log('Output du déploiement du backend:', data);
    });

    deployProcess.stderr.on('data', error => {
        console.error('Erreurs du déploiement du backend:', error);
    });

    deployProcess.on('close', code => {
        console.log('Le script de déploiement du backend s\'est terminé avec le code', code);
    });

    res.sendStatus(200);
});

// Route pour recevoir le webhook GitHub pour le déploiement du frontend
router.post('/github/deploy/front', (req, res) => {
    const deployProcess = exec(`sh /opt/app/front/scripts/deploy-front.sh`);

    deployProcess.stdout.on('data', data => {
        console.log('Output du déploiement du frontend:', data);
    });

    deployProcess.stderr.on('data', error => {
        console.error('Erreurs du déploiement du frontend:', error);
    });

    deployProcess.on('close', code => {
        console.log('Le script de déploiement du frontend s\'est terminé avec le code', code);
    });

    res.sendStatus(200);
});

module.exports = router;
