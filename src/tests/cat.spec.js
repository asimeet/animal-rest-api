const CatService = require('../services/cat.service');

const { mockRestClient } = require('./customMocks/mockRestClient');
const { mockBreeds, mockVotes, mockBreedsOutput } = require('./customMocks/mockData')
const { CAT_API_KEY } = require('../common/app.config');


const catService = new CatService(mockRestClient);

beforeEach(() => mockRestClient.resetMockData());


describe('Cat Service', () => {
    it('get breeds should be successful', async () => {
        mockRestClient.setMockData(`${catService.url}/breeds`, 'get', { data: mockBreeds });
        const result = await catService.getBreeds();

        expect(result).toMatchObject(mockBreedsOutput);
    });

    it('get breeds should be successfull even if data is empty', async () => {
        mockRestClient.setMockData(`${catService.url}/breeds`, 'get', { data: [] });
        const result = await catService.getBreeds();

        expect(result).toMatchObject([]);
    });

    it('vote breed should be successful', async () => {
        mockRestClient.setMockData(`${catService.url}/breeds`, 'get', { data: mockBreeds });

        const mockData = {
            "message": "SUCCESS",
            "id": 591864,
            "image_id": "0XYvRd7oD",
            "value": 4,
            "country_code": "NL"
        }

        mockRestClient.setMockData(`${catService.url}/votes?api_key=${CAT_API_KEY}`, 'get', { data: mockVotes });
        mockRestClient.setMockData(`${catService.url}/votes?api_key=${CAT_API_KEY}`, 'post', { data: mockData })
        const result = await catService.voteBreed({ animalId: 'abys', up: true });

        expect(result).toMatchObject(mockData);
    });
});