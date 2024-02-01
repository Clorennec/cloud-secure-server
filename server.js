const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Endpoint pour le déploiement
app.post('/deploy', (req, res) => {
  const scriptName = 'deploy-back.sh';

  exec(`bash ${scriptName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur d'exécution du script : ${error}`);
      res.status(500).send('Erreur d\'exécution du script');
    } else {
      console.log(`Sortie du script : ${stdout}`);
      res.status(200).send('Script exécuté avec succès');
    }
  });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'écoute sur le port ${port}`);
});

