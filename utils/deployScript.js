const { exec } = require("child_process");

const deployScript = (scriptPath, res) => {
    // Exécute le script de déploiement
    const deployProcess = exec(`sh ${scriptPath}`);

    let outputData = ''; // Variable pour stocker les données de sortie et d'erreur

    // Capture les logs de sortie
    deployProcess.stdout.on('data', data => {
        console.log('Deployment log:', data);
        outputData += data;
    });

    // Gère les erreurs de script
    deployProcess.stderr.on('data', error => {
        console.error('Deployment error:', error);
        // Ajoute les données d'erreur à la variable de sortie
        outputData += error;
    });

    // Fin de l'exécution du script
    deployProcess.on('close', code => {
        console.log('Deployment process exited with code', code);
        // Envoie une réponse avec les données de sortie et d'erreur une fois que l'exécution du script est terminée
        res.status(200).json({ output: outputData });
        // Signale la fin de l'exécution à l'application React
        res.end();
    });
};

module.exports = deployScript;