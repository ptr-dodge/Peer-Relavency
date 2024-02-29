const names = ['Professor Parviz', 'Lalik', 'Allen', 'Hyun Yoon', 'Paloma', 'Jonah', 'Leana', 'Kylie', 'Siera', 'Truth', 'Fartun Aden', 'Dani Herd', 'Yana', 'Jocelyn', 'Satinder', 'Mya', 'Zahra', 'Osman Ali', 'Peter', 'Weihua', 'Enzo'];

const categories = {
    'openness': [5,3,4,2,4,4,5,5,5,5,5,3,3,4,3,4,3,3,4,2,3],
    'conscientiousness': [3,2,2,3,4,2,3,2,2,3,2,4,3,4,2,3,3,5,4,1,4],
    'extraversion': [3,4,1,2,5,4,5,0,5,3,4,2,0,2,1,5,3,5,2,4,5],
    'agreeableness': [5,5,4,2,4,5,5,4,2,4,4,4,5,5,3,5,4,3,5,2,2],
    'neuroticism': [5,3,3,1,4,2,3,3,3,3,1,2,2,2,2,5,2,1,2,3,1],
};

function getPeople() {
    const people = [];
    for (let index = 0; index < names.length; index++) {
        const name = names[index];
        const person = {'name': name, 'attributes': []};

        for (const category in categories) {
            const attribute = {[category]: categories[category][index]};
            person['attributes'].push(attribute);
        }

        people.push(person);
    }

    return people;
}

function euclideanDistance(vector1, vector2) {
    if (vector1.length !== vector2.length) {
        throw new Error('Vectors must have the same length');
    }

    let sum = 0;
    for (let i = 0; i < vector1.length; i++) {
        sum += Math.pow(vector1[i] - vector2[i], 2);
    }

    return Math.sqrt(sum);
}

function calculateSimilarity(person1, person2) {
    const attributes1 = person1['attributes'].map(attribute => Object.values(attribute)[0]);
    const attributes2 = person2['attributes'].map(attribute => Object.values(attribute)[0]);
    const distance = euclideanDistance(attributes1, attributes2);
    return distance;
}

function sortPeopleBySimilarity(targetPerson, peopleList) {
    const similarityScores = peopleList.map(person => [person['name'], calculateSimilarity(targetPerson, person)]);
    const sortedPeople = similarityScores.sort((a, b) => a[1] - b[1]);
    return sortedPeople;
}

function compareAllPeople(peopleList) {
    const comparisons = [];

    for (let i = 0; i < peopleList.length; i++) {
        for (let j = i + 1; j < peopleList.length; j++) {
            const person1 = peopleList[i];
            const person2 = peopleList[j];

            const similarity = calculateSimilarity(person1, person2);
            const comparison = `${person1['name']} vs ${person2['name']}: ${similarity}`;
            comparisons.push([person1['name'], person2['name'], similarity]);
        }
    }

    return comparisons;
}

function main() {
    const people = getPeople();

    for (let index = 0; index < people.length; index++) {
        console.log(people[index]['name'] + ':', index);
    }

    const argFlag = true; // Set this flag accordingly

    if (argFlag) {
        const allComparisons = compareAllPeople(people);

        for (const [person1, person2, similarity] of allComparisons) {
            console.log(`${person1} vs ${person2}: ${similarity}`);
        }
    } else {
        const target = 0; // Set the target index accordingly
        const targetPerson = people[target];
        const sortedPeople = sortPeopleBySimilarity(targetPerson, people);

        for (const [person, distance] of sortedPeople) {
            console.log(`${distance}: ${person}`);
        }
    }
}

main();
