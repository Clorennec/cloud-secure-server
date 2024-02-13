const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

const deployScript = (scriptPath, res) => {
    // Exécute le script de déploiement
    const deployProcess = exec(`sh ${scriptPath}`);

    let errorData = ''; // Variable pour stocker les données d'erreur

    // Capture les logs de sortie
    deployProcess.stdout.on('data', data => {
        console.log('Deployment log:', data);
        res.write(data);
    });

    // Gère les erreurs de script
    deployProcess.stderr.on('data', error => {
        console.error('Deployment error:', error);
        // Ajoute les données d'erreur à la variable errorData
        res.write(error);
    });

    // Fin de l'exécution du script
    deployProcess.on('close', code => {
        console.log('Deployment process exited with code', code);
        // Si des erreurs sont survenues, envoie une réponse avec le statut 500 et les données d'erreur
        if (errorData) {
            res.status(500).json({ error: errorData });
        } else {
            // Sinon, envoie une réponse avec le statut 200 et un message de succès
            res.status(200).json({ message: 'Deployment successful' });
        }
        // Signale la fin de l'exécution à l'application React
        res.end();
    });
};

router.post('/deploy/back', (req, res) => {
    deployScript('/opt/app/back/scripts/deploy-back.sh', res);
});

router.post('/deploy/front', (req, res) => {
    deployScript('/opt/app/front/scripts/deploy-front.sh', res);
});

module.exports = router;
