const APP_ENV = process.env.APP_ENV || 'local';

const APP_PORT = process.env.APP_PORT || 3323;

const APP_URL = APP_ENV === 'local' ? `http://localhost:${APP_PORT}` : process.env.APP_URL;

const CAT_API_KEY = process.env.CAT_API_KEY;

const DOG_API_KEY = process.env.DOG_API_KEY;

const CAT_API_BASE_URL = process.env.CAT_API_BASE_URL || "https://api.thecatapi.com/v1";

const DOG_API_BASE_URL = process.env.DOG_API_BASE_URL || "https://api.thedogapi.com/v1"

module.exports = {
    APP_ENV, APP_PORT, APP_URL, CAT_API_KEY, CAT_API_BASE_URL, DOG_API_KEY, DOG_API_BASE_URL
}
