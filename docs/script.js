import PersonalityComparator from "./compare.js";

// Function to sort people by similarity to the chosen person and prepare comparisons
function sortByPerson(comparator, index) {
    const sortedPeople = comparator.sortSimilar(index);

    let listedPeople = []
    for (let personNumber = 0; personNumber < sortedPeople.length; personNumber++) {
        let person = sortedPeople[personNumber][0]
        let distance = sortedPeople[personNumber][1]

        listedPeople.push({ person, distance })
    }
    return listedPeople
}

// Function to display sorted comparisons in HTML
function showSorted(sortedComparisons, container) {
    let i = 0;
    sortedComparisons.forEach(({ person, distance }) => {
        createElement('div', `pvp-${i++}`, container, `${distance}: ${person}`, distance);
    });
    return true
}

// Function to compare every person to every other person
function compareAll(comparator) {
    return comparator.compareAllPeople().map(([person1, person2, similarity]) => ({
        person1,
        person2,
        similarity
    }));
}

// Function to display all comparisons in HTML
function showAll(allComparisons, container) {
    allComparisons.forEach(({ person1, person2, similarity }) => {
        createElement('div', 'parent', container, `${similarity} similarity between ${person1} and ${person2}`, similarity);
    });
    window.comparatorInstance.beVerbose(allComparisons, true)
    return container
}

// Function to create and append elements
function createElement(tag, id, parent, text, value = '') {
    const element = document.createElement(tag);
    if (id !== "") element.id = id
    if (text) element.textContent = text;
    if (parent) document.getElementById(parent.id).appendChild(element);
    if (value) element.value = value;
    return element;
}

// we need to return the child
function personInput(id) {
    // Parse the value as an integer and subtract 1 to convert it to a zero-based index
    const index = parseInt(id.value)

    // Ensure the parsed index is a valid number
    return !isNaN(index) ? index : -1
}

function populateSelectWithOptions(people, parent) {
    let selected = ''
    let children = []
    // Create and append new options based on the people list
    for (let index = 0; index < people.length; index++) {
        let optionID = `list-option-${index}`;
        let child = createElement('option', optionID, parent, people[index].name, `${index}`);
        if (child.selected) {
            selected = child
        } else child.selected = false
        children.push(child);
    }
    parent.value = selected.value
    if (children.length > 0) {
        return children
    } else return () => console.error(`Error occured because the value of \`children\` is ${children} and the type is, ${typeof (children)}`)
}

window.toggle = (selector, displayMode = 'block', button) => {
    let element = document.querySelector(selector)
    let display = element.style.display
    if (display == 'none') {
        button.innerText = 'Hide Table'
        element.style.display = displayMode
    } else if (display == displayMode) {
        button.innerText = 'Show Table'
        element.style.display = 'none'
    }
    return element.style.display
}

function main() {
    const comparator = new PersonalityComparator(names, attributes);
    // Create an instance of our comparator class
    // Define some settings we want to use from the class.
    window.comparatorInstance = comparator
    comparator.initializePeople();
    // comparator.verbose = true

    let people = compareAll(comparator)
    let container = document.querySelector('#people-chart')
    let compareAllButton = document.querySelector('#compare-all')
    compareAllButton.addEventListener('click', () => {
        let viewButton = document.getElementById('chart-view')
        viewButton.innerText = 'Hide Table'
        viewButton.style.display = 'block'

        window.comparatorInstance.beVerbose(people)
        window.comparatorInstance.beVerbose(container)
        showAll(people, container)
    })

    let results = document.querySelector('.results')
    results.appendChild(container)

    let selects = [
        document.getElementById('select-1'),
        document.getElementById('select-2'),
        document.getElementById('person-to-person')
    ]
    selects.forEach(select =>
        populateSelectWithOptions(window.comparatorInstance.people, select)
    )

    let pvpButton = document.getElementById('pvp-button')
    pvpButton.addEventListener('click', () => {
        let pvpValue = parseInt(document.getElementById('person-to-person').value)
        let comparisonResults = document.getElementById('comparison')
        comparisonResults.innerHTML = ''

        let pvp = sortByPerson(comparator, pvpValue)

        showSorted(pvp, comparisonResults)
    })

    const compareButton = document.getElementById('compare-button')
    compareButton.onclick = () => {
        const [
            person1, person2
        ] = [
                personInput(document.getElementById('select-1')),
                personInput(document.getElementById('select-2'))
            ]
        let similarity = window.comparatorInstance.calculateSimilarity(person1, person2)

        let element = document.querySelector('#compare-between');
        let person1Name = window.comparatorInstance.people[person1.valueOf()].name
        let person2Name = window.comparatorInstance.people[person2.valueOf()].name
        // Clear the existing result and replace
        createElement('p', 'section-1', element, `Person 1: ${person1Name}`, '')
        createElement('p', 'section-2', element, `Person 2: ${person2Name}`, '')
        element.innerHTML = ''
        element.innerHTML = element.innerHTML+`Similarity: ${similarity}`;
    }
}

// Initialize variables for the data
const names = ['Professor Parviz', 'Lalik', 'Allen', 'Hyun Yoon', 'Paloma', 'Jonah', 'Leana', 'Kylie', 'Siera', 'Truth', 'Fartun Aden', 'Dani Herd', 'Yana', 'Jocelyn', 'Satinder', 'Mya', 'Zahra', 'Osman Ali', 'Peter', 'Weihua', 'Enzo'];
const attributes = {
    'openness': [5, 3, 4, 2, 4, 4, 5, 5, 5, 5, 5, 3, 3, 4, 3, 4, 3, 3, 4, 2, 3],
    'conscientiousness': [3, 2, 2, 3, 4, 2, 3, 2, 2, 3, 2, 4, 3, 4, 2, 3, 3, 5, 4, 1, 4],
    'extraversion': [3, 4, 1, 2, 5, 4, 5, 0, 5, 3, 4, 2, 0, 2, 1, 5, 3, 5, 2, 4, 5],
    'agreeableness': [5, 5, 4, 2, 4, 5, 5, 4, 2, 4, 4, 4, 5, 5, 3, 5, 4, 3, 5, 2, 2],
    'neuroticism': [5, 3, 3, 1, 4, 2, 3, 3, 3, 3, 1, 2, 2, 2, 2, 5, 2, 1, 2, 3, 1],
};

document.addEventListener('DOMContentLoaded', () => main());