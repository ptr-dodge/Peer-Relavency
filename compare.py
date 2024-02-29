import numpy as np
from sys import argv

names = ['Professor Parviz', 'Lalik', 'Allen', 'Hyun Yoon', 'Paloma', 'Jonah', 'Leana', 'Kylie', 'Siera', 'Truth', 'Fartun Aden', 'Dani Herd', 'Yana', 'Jocelyn', 'Satinder', 'Mya', 'Zahra', 'Osman Ali', 'Peter', 'Weihua', 'Enzo']

categories = {
    'openness': [5,3,4,2,4,4,5,5,5,5,5,3,3,4,3,4,3,3,4,2,3],
    'conscientiousness': [3,2,2,3,4,2,3,2,2,3,2,4,3,4,2,3,3,5,4,1,4],
    'extraversion': [3,4,1,2,5,4,5,0,5,3,4,2,0,2,1,5,3,5,2,4,5],
    'agreeableness': [5,5,4,2,4,5,5,4,2,4,4,4,5,5,3,5,4,3,5,2,2],
    'neuroticism': [5,3,3,1,4,2,3,3,3,3,1,2,2,2,2,5,2,1,2,3,1],
}

def get_people():
    people = []
    for index in range(0, len(names)):
        name = names[index]
        person = {'name': name, 'attributes': []}

        for category in categories:
            attribute = {category: categories[category][index]}
            person['attributes'].append(attribute)

        people.append(person)

    return people

def euclidean_distance(vector1, vector2):
    return np.linalg.norm(np.array(vector1) - np.array(vector2))

def calculate_similarity(person1, person2):
    attributes1 = [list(attribute.values())[0] for attribute in person1['attributes']]
    attributes2 = [list(attribute.values())[0] for attribute in person2['attributes']]
    distance = euclidean_distance(attributes1, attributes2)
    return distance

def sort_people_by_similarity(target_person, people_list):
    # Calculate similarity scores for the target person against others
    similarity_scores = [(person['name'], calculate_similarity(target_person, person)) for person in people_list]
    
    # Sort people by similarity (lower distance is more similar)
    sorted_people = sorted(similarity_scores, key=lambda x: x[1])

    return sorted_people

def compare_all_people(people_list):
    comparisons = []

    for i in range(len(people_list)):
        for j in range(i + 1, len(people_list)):
            person1 = people_list[i]
            person2 = people_list[j]

            similarity = calculate_similarity(person1, person2)
            comparison = f"{person1['name']} vs {person2['name']}: {similarity}"
            comparisons.append((person1['name'], person2['name'], similarity))

    return comparisons

def parse_args(args):
    options = ['-a', '-l']
    # we want to skip the first argument (the file name)
    for index in range(1, len(args)):
        line = args[index]
        options.append([{options[index]: True}] if line in ['-a', '--all'] else [{options[index]: False}])
        options.append([{options[index]: True}] if line in ['-l', '--list'] else [{options[index]: False}])

def main():
    options = parse_args(argv)
    people = get_people()

    for index in range(0, len(people)):
            print(people[index]['name']+':', index)
            # for person in people[index]:
                # print(person[0])

    if arg_flag:
        # Example: Compare every person to every other person
        all_comparisons = compare_all_people(people)

        # Display the comparisons
        for person1, person2, similarity in all_comparisons:
            print(f"{person1} vs {person2}: {similarity}")
    else:
        # Example: Sort people by similarity to the chosen person
        target = int(input("\nPick a person: \n"))
        target_person = people[target]
        sorted_people = sort_people_by_similarity(target_person, people)

        # Display the sorted list
        for person, distance in sorted_people:
            print(f"{distance}: {person}")

        # print('\nThe most similar person to '+str(target_person['name']), 'is', str(sorted_people[1][0]))

main()