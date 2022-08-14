const { AnimalInterface } = require("../common/animal.interface");
const { DOG_API_BASE_URL, DOG_API_KEY } = require('../common/app.config')

class DogService extends AnimalInterface {
    constructor(restClient) {
        super();
        this.restClient = restClient;
        this.url = DOG_API_BASE_URL;
        this.apiKey = DOG_API_KEY;

    }

    async getBreeds() {
        const response = await this.restClient.get(`${this.url}/breeds`);
        const breeds = response?.data?.
            map(({ id: animalId, name: animalName, image, description, origin }) => ({ animalId, animalName, description, origin, image }))
        return breeds;
    }

    async voteBreed({ animalId, up, down }) {

        const message = "The voting feature for dog breeds will be implemented soon...";

        return { message }

    }
}

module.exports = DogService;