const express = require("express");
const { exec } = require("child_process")

const router = express.Router();

router.post('/deploy/back', (req, res) => {
    // Exécute le script de déploiement
    const deployProcess = exec('sh /opt/app/back/scripts/deploy-back.sh');

    // Capture les logs de sortie
    deployProcess.stdout.on('data', data => {
        console.log('Deployment log:', data);
        // Renvoie les logs à l'application React en temps réel
        res.write(data);
    });

    // Gère les erreurs de script
    deployProcess.stderr.on('data', error => {
        console.error('Deployment error:', error);
        // Renvoie les erreurs à l'application React
        res.status(500).json({ error: 'Deployment error' });
    });

    // Fin de l'exécution du script
    deployProcess.on('close', code => {
        console.log('Deployment process exited with code', code);
        // Signale la fin de l'exécution à l'application React
        res.end();
    });
});

router.post('/deploy/front', (req, res) => {
    // Exécute le script de déploiement
    const deployProcess = exec('sh /opt/app/front/scripts/deploy-front.sh');

    // Capture les logs de sortie
    deployProcess.stdout.on('data', data => {
        console.log('Deployment log:', data);
        // Renvoie les logs à l'application React en temps réel
        res.write(data);
    });

    // Gère les erreurs de script
    deployProcess.stderr.on('data', error => {
        console.error('Deployment error:', error);
        // Renvoie les erreurs à l'application React
        res.status(500).json({ error: 'Deployment error' });
    });

    // Fin de l'exécution du script
    deployProcess.on('close', code => {
        console.log('Deployment process exited with code', code);
        // Signale la fin de l'exécution à l'application React
        res.end();
    });
});

module.exports = router;