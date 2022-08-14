const { AnimalInterface } = require("../common/animal.interface");
const { CAT_API_BASE_URL, CAT_API_KEY } = require('../common/app.config')

class CatService extends AnimalInterface {
    /* 
     *  Simulating dependency injection, 
     *  The rest client will be easy to change from axios to some other library given method signature of methods are same
     *  if the signature change we will use adapter design pattern and then inject here
     */
    constructor(restClient) {
        super();
        this.restClient = restClient;
        this.url = CAT_API_BASE_URL;
        this.apiKey = CAT_API_KEY;
    }

    async getImageId(catId) {
        const cats = await this.getBreeds();
        const cat = cats.find(_cat => _cat?.animalId === catId);

        return cat?.image?.id;
    }

    async getVotes(imageId) {
        const response = await this.restClient.get(`${this.url}/votes?api_key=${CAT_API_KEY}`);
        const votes = response.data;

        const vote = votes.sort((a, b) => a?.created_at > b?.created_at ? -1 : 1).find(_vote => _vote.image_id === imageId);

        return vote?.value || 0;
    }

    async getBreeds() {
        const response = await this.restClient.get(`${this.url}/breeds`);
        const breeds = response?.data?.
            map(({ id: animalId, name: animalName, image, description, origin }) => ({ animalId, animalName, description, origin, image }))
        return breeds;
    }

    async voteBreed({ animalId, up, down }) {

        const imageId = await this.getImageId(animalId);

        const vote = await this.getVotes(imageId);

        const body = {
            image_id: imageId,
            value: up ? (vote + 1) : (down ? vote - 1 : vote)
        }

        const response = await this.restClient.post(`${this.url}/votes?api_key=${CAT_API_KEY + ""}`, body);

        return response.data;

    }
}

module.exports = CatService;