# Demo Rest API app

The app focuses on integrating external apis into a node.js app and demonstrate design patterns and TDD.

## System Design

- An 'express' server is used to render html as static asset.
- External API is called by http client 'axios'
- Two free external API are used for demonstration 'thecatapi' and 'thedogapi'
- The 'Animal Interface' is used for abstracting details.
- A 'facade' design pattern is achieved by using the 'Animal Interface'
- Any animal be it a dog or a cat, we should be able to get it's breeds and upvote or downvote a breed.
- The details for implementing a getBreeds or voteBreed is different for cat, dog or the animalFacade but it serves to a common goal.
- Getting breeds of an animal is 'GET' verb while upvoting or downvoting a breed is a 'POST' verb.
- The 'dependency injection' design pattern is also demonstrated by injecting 'axios' as the restClient for any animal service.
  This gives us flexbility if later we choose to change the http or rest client.
- A middleware is also used to catch any error unhandelled error centrally thus avoiding server crash.
- The secrets are hidden behind the environmental variables
- Unit test cases are achieved with help of npm module 'jest'

## Improvements that can be done

- Validating the reqest body for post calls
- Optimize unit testcases
- Enabling CORS
- UI styling
- Using Cache
- Log management
- Prometheus monitoring
- e2e test mechnanism

## API endpoints

```
    GET

    http:localhost:3323/breeds/cats

    http:localhost:3323/breeds/dogs

    RESPONSE - 200

    {
        "animalId": string,
        "animalName": string,
        "origin": string,
        "description": string,
        "image": {
            url: string
        }
    }
```

```
    POST

    http:localhost:3323/vote/cats

    http:localhost:3323/vote/dogs

    REQUEST:

    {
        "animalId": string,
        "up": boolean,        // true if we want to upvote
        "down": boolean       // true if we want to downvote
    }

    RESPONSE - 200

    {
        "message": string,
        "id": number,
        "image_id": string,
        "value": number,      // total number of votes per breed of an animal
    }
```

|![](https://github.com/asimeet/animal-rest-api/blob/master/demo.gif)|
|--------------------------------------------------------------------|

## Set up

1.  clone the repo
2.  go the https://api.thecatapi.com and sign up to get a API_KEY
3.  `export CAT_API_KEY={api_key_you_get_from_above_step}`
4.  `npm install`
5.  `npm run test`
6.  `npm run start`
7.  got to http:localhost:3323 and play around in the html
8.  observe the rest calls from netwrok tab
