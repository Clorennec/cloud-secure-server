const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 4000;

const CLIENT_ID = '05b8fef3db2a5766094f';
const CLIENT_SECRET = '37eb40dbeeeba6a32c893c78a3dd34218b3bfb48';

app.use(cors);
app.use(bodyParser.json);

app.get('/getAccessToken', async function (req, res) {
  req.query.code;
  const params = "?client_id=" + CLIENT_ID + "&client_secret=" +CLIENT_SECRET + "&code=" + req.query.code;
  await fetch('https://github.com/login/oauth/access_token' + params, {
    method: "POST",
    headers: {
      "Accept": "application/json"
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    res.json(data);
  })
})

app.get('/getUserData', async function (req, res) {
  req.get('Authorization')
  await fetch('https://api.github.com/user', {
    method: "GET",
    headers: {
      "Authorization": req.get("Authorization")
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.json(data);
  })
})

app.get('/test', (req, res) => {
  res.status(200).send('test recu');
})

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

