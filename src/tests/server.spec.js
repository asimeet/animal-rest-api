const axios = require('axios');
const APP_PORT = 7002;
const APP_URL = `http://localhost:${APP_PORT}`;

jest.mock('../common/app.config', () => {
    const original = jest.requireActual('../common/app.config');

    return {
        ...original,
        APP_PORT,
        APP_URL
    };
});

beforeAll(() => require('../server'));

describe('APP', () => {
    it('check app is running and rendering the html page', async () => {
        const res = await axios.get(APP_URL);
        expect(res.data.includes('Select an animal to get details')).toBe(true);
    });
});