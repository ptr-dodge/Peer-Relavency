export default class PersonalityComparator {
    constructor(names, attributes) {
        this.names = names;
        this.attributes = attributes;
        this.people = [];
        this.verbose = false;
    }

    beVerbose() {
        if (this.verbose) {
            console.log(...arguments);
        }
    }

    // Method to initialize people array
    initializePeople() {
        for (let index = 0; index < this.names.length; index++) {
            const name = this.names[index];
            const person = { name: name, attributes: [] };

            for (const category in this.attributes) {
                const attribute = { [category]: this.attributes[category][index] };
                person.attributes.push(attribute);
            }

            this.people.push(person);
            this.beVerbose(name, person);
        }
        this.beVerbose("Initialized People:", ...this.people);
    }

    // Method to calculate Euclidean distance
    euclideanDistance(vector1, vector2) {
        let result;
        if (vector1.length !== vector2.length) {
            throw new Error('Vectors must have the same length');
        }

        let sum = 0;
        for (let i = 0; i < vector1.length; i++) {
            sum += Math.pow(vector1[i] - vector2[i], 2);
        }

        result = Math.sqrt(sum);
        this.beVerbose(result);
        return result;
    }

    // Method to calculate similarity between two people
    calculateSimilarity(index1, index2) {
        this.beVerbose("First input:", index1, "Second input:", index2);
        const attributes1 = this.people[index1].attributes.map(attribute => Object.values(attribute)[0]);
        const attributes2 = this.people[index2].attributes.map(attribute => Object.values(attribute)[0]);
        const distance = this.euclideanDistance(attributes1, attributes2);
        return distance.toFixed(3);
    }

    // Method to sort people by similarity to a target person
    sortSimilar(targetPerson) {
        const similarityScores = [];
        console.log('this.people:', this.people);
        for (let person = 0; person < this.people.length; person++) {
            console.log('person:', person)
            // problem is coming from calculateSimilarity
        const similarity = this.calculateSimilarity(targetPerson, person)
            console.log('similarity:', similarity)
            console.log('person.name:', this.people[person].name);
            similarityScores.push([this.people[person].name, similarity]);
        }
        const sortedPeople = similarityScores.sort((a, b) => a[1] - b[1]);
        this.beVerbose(similarityScores, sortedPeople);
        return sortedPeople;
    }

    // Method to compare all people
    compareAllPeople() {
        const comparisons = [];

        for (let i = 0; i < this.people.length; i++) {
            for (let j = i + 1; j < this.people.length; j++) {
                const person1 = this.people[i];
                const person2 = this.people[j];

                const similarity = this.calculateSimilarity(i, j);
                const comparison = `${person1.name} vs ${person2.name}: ${similarity}`;
                comparisons.push([person1.name, person2.name, similarity]);
            }
        }
        this.beVerbose(comparisons);
        return comparisons;
    }
}
