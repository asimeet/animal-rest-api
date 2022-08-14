let selectedAnimal = "";

const config = {
    baseAppUrl: 'http://localhost:3323'
}

const init = () => {
    document.getElementById('cat-button').dispatchEvent(new Event('click'));
}

const getBreeds = (animal) => {
    selectedAnimal = animal;
    document.getElementById(`${animal}-button`).classList.add('button-clicked');
    document.getElementById(`${animal == 'cat' ? 'dog' : 'cat'}-button`).classList.remove('button-clicked');

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (err, data) {
        if (this.readyState == 4 && this.status == 200) {
            renderGalery(JSON.parse(this.response));
        }
        if (this.status >= 400 && this.status <= 500) {
            alert(this.statusText);
            this.abort();
        }
    };
    xhttp.open("GET", `${config.baseAppUrl}/breeds/${animal}s`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}


const renderGalery = (data) => {
    const galery = document.getElementById('galery');

    galery.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const animalInfo = document.createElement('div');
        animalInfo.classList.add('animal-info');


        const votes = document.createElement('div');
        votes.classList.add('votes-container');

        votes.innerHTML = `
            <button class="upvote" onclick="vote('up','${data[i].animalId}')"> Upvote </button>
            <button class="downvote" onclick="vote('down','${data[i].animalId}')"> Downvote </button>
        `

        const image = document.createElement('img');
        image.src = data[i]?.image?.url;
        image.alt = data[i]?.description;
        image.classList.add('animal-pic');

        const animalDesc = document.createElement('div');
        animalDesc.classList.add('animal-desc')
        animalDesc.innerHTML = `
            <div>Name:</div>
            <div>${data[i].animalName}</div>
            <div>Origin:</div>
            <div>${data[i].origin}</div>
            <div>Id:</div>
            <div>${data[i].animalId}</div>
            <div>Desciption:</div>
            <div>${data[i].description}</div>
        `;

        animalInfo.appendChild(votes);
        animalInfo.appendChild(image);
        animalInfo.appendChild(animalDesc);

        galery.appendChild(animalInfo)
    }
}

const vote = (voteType, animalId) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (err, data) {
        if (this.readyState == 4 && this.status == 200) {
            let alertMessage;
            const result = JSON.parse(this.response);
            if (result?.message == 'SUCCESS') {
                alertMessage = `
                ${selectedAnimal} wtih id '${animalId}' has been ${voteType}voted
                total votes for this breed is ${result.value}`;
            } else {
                alertMessage = `${result?.message || 'something went wrong'}`
            }
            alert(alertMessage);
        }
        if (this.status >= 400 && this.status <= 500) {
            alert(this.statusText);
            this.abort();
        }
    };
    xhttp.open("POST", `${config.baseAppUrl}/vote/${selectedAnimal}s`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    const body = {
        animalId,
        up: voteType == 'up',
        down: voteType == 'down'
    }
    xhttp.send(JSON.stringify(body));
}

