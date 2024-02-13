const express = require("express");
const deployScript = require("../utils/deployScript");
const { checkContainerStatus } = require("../utils/checkContainerStatus")

const router = express.Router();

router.post('/deploy/back', (req, res) => {
    deployScript('/opt/app/back/scripts/deploy-back.sh', res);
});

router.post('/deploy/front', (req, res) => {
    deployScript('/opt/app/front/scripts/deploy-front.sh', res);
});

router.get('/status/front', async (req, res) => {
    try {
        // Appel de la fonction pour vérifier l'état du conteneur
        const isRunning = await checkContainerStatus("front-1");
        
        // Envoi de la réponse avec l'état du conteneur
        res.json({ isRunning });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'état du conteneur :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'état du conteneur' });
    }
});

router.get('/status/back', async (req, res) => {
    try {
        // Appel de la fonction pour vérifier l'état du conteneur
        const isRunning = await checkContainerStatus("back-1");
        
        // Envoi de la réponse avec l'état du conteneur
        res.json({ isRunning });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'état du conteneur :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'état du conteneur' });
    }
});

module.exports = router;
