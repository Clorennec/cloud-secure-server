const Docker = require('dockerode');

const docker = new Docker();

const checkContainerStatus = async (containerName) => {
    try {
        const containers = await docker.listContainers({ all: true });
        const container = containers.find(c => c.Names.includes(containerName));
        return container && container.State === 'running';
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'état du conteneur :', error);
        return false; 
    }
};

module.exports = { checkContainerStatus };
