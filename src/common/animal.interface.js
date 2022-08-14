
const _interfaceObject = {
    getBreeds: () => { },
    voteBreed: () => { }
};



class AnimalInterface {
    constructor() {
        this.interfaceObject = _interfaceObject;

        Object.keys(this.interfaceObject).forEach(artifact => {
            if (!this[artifact]) {
                throw new Error(`${artifact} needs to be implemented`);
            }
            if (typeof this[artifact] !== typeof this.interfaceObject[artifact]) {
                throw new Error(`type of ${artifact} should be ${this.interfaceObject[artifact]} `);
            }
        })
    }
}

module.exports = { AnimalInterface }