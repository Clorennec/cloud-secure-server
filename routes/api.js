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
        const isRunning = await checkContainerStatus("/front-1");
        res.json({ isRunning });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'état du conteneur :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'état du conteneur' });
    }
});

router.get('/status/back', async (req, res) => {
    try {
        const isRunning = await checkContainerStatus("/back-1");
        res.json({ isRunning });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'état du conteneur :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'état du conteneur' });
    }
});

module.exports = router;
