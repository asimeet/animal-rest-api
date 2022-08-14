const express = require('express');
const axios = require('axios');

const { AnimalInterface } = require('../common/animal.interface');

const services = {
    cats: require('./cat.service'),
    dogs: require('./dog.service')
}

/**
 * This facade provides abstraction to details working of getBreeds and voteBreed
 * of any Animal be it cat or a dog or so one.
 * The external apis for different animals dog or cat can provide very different responses
 * But this facade will not care about it and just call the responsible class of the animal
 */
class AnimalFacadeService extends AnimalInterface {

    constructor() {
        super();
        this.restClient = axios;
    }

    _getAnimalInstance(path) {
        const paths = path.split('/');

        const animal = services[paths[2]];

        if (!animal) {
            throw {
                message: `requested path '${path}' is not supported by the app`,
                statusCode: 404
            }
        }

        const animalInstance = new animal(this.restClient);

        return animalInstance;
    }

    getBreeds() {

        const router = express.Router();

        router.get('/', async (req, res, next) => {
            try {
                const animalInstance = this._getAnimalInstance(req.baseUrl);
                const results = await animalInstance.getBreeds();

                res.status(200).send(results);
            } catch (err) {
                next(err)
            }
        })

        return router;

    }

    voteBreed() {

        const router = express.Router();

        router.post('/', async (req, res, next) => {
            try {
                const animalInstance = this._getAnimalInstance(req.baseUrl);
                const results = await animalInstance.voteBreed(req.body);

                res.status(200).send(results);
            } catch (err) {
                next(err)
            }
        })

        return router;

    }
}

module.exports = { AnimalFacadeService };