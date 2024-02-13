const Docker = require('dockerode');

// Créez une instance Dockerode pour interagir avec l'API Docker
const docker = new Docker();

// Fonction pour vérifier si le conteneur est en cours d'exécution
const checkContainerStatus = async (containerName) => {
    try {
        // Récupérez tous les conteneurs en cours d'exécution
        const containers = await docker.listContainers({ all: true });

        // Vérifiez si votre conteneur spécifique est en cours d'exécution
        const container = containers.find(c => c.Names.includes(containerName));

        // Si le conteneur est trouvé et qu'il est en cours d'exécution, retournez true
        return container && container.State === 'running';
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'état du conteneur :', error);
        return false; // En cas d'erreur, retournez false par défaut
    }
};

module.exports = { checkContainerStatus };
