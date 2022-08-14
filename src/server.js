const express = require('express');

const path = require('path');

const { APP_PORT, APP_URL } = require("./common/app.config");

const { catchServerError } = require("./common/middleware")

const { AnimalFacadeService } = require('./services/animal-facade.service');

const facadeService = new AnimalFacadeService();

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, './ui')));

app.get('/', (req, res) => {
    res.status(200).send('rest-api app is working');
})


app.use('/breeds/:animal', facadeService.getBreeds());

app.use('/vote/:animal', facadeService.voteBreed());

app.use(catchServerError);

app.listen(APP_PORT, () => {
    console.log(`The app can be accessed @ ${APP_URL} `)
})
