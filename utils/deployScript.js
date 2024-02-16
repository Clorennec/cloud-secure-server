const { exec } = require("child_process");

const deployScript = (scriptPath, res) => {
    const deployProcess = exec(`sh ${scriptPath}`);

    let outputData = ''; 

    deployProcess.stdout.on('data', data => {
        console.log('Deployment log:', data);
        outputData += data;
    });

    deployProcess.stderr.on('data', error => {
        console.error('Deployment error:', error);
        outputData += error;
    });

    deployProcess.on('close', code => {
        console.log('Deployment process exited with code', code);
        res.status(200).json({ output: outputData });
        res.end();
    });
};

module.exports = deployScript;