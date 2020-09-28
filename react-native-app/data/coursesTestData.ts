const courses = [
    {
        title: 'Express Server',
        description: '教你寫Server',
        tutor: 'Gordon Lau',
        numOfLessons: 8,
        price: 100,
        aveScore: 4.6,
        numOfStudents: 10,
        isPurchased: false,
        coursePic: require('../assets/coursesPic/express.jpg'),
        tutorPic: require('../assets/tutorsPic/gordon.jpg'),
        id: '1'
    },
    {
        title: 'FireBase',
        description: '教你寫Server',
        tutor: 'Gordon Lau',
        numOfLessons: 6,
        price: 150,
        aveScore: 3.5,
        numOfStudents: 30,
        isPurchased: true,
        coursePic: require('../assets/coursesPic/firebase.png'),
        tutorPic: require('../assets/tutorsPic/gordon.jpg'),
        id: '2'
    },
    {
        title: 'Flutter',
        description: '教你寫App',
        tutor: 'Jason Lee',
        numOfLessons: 12,
        price: 120,
        aveScore: 4.4,
        numOfStudents: 15,
        isPurchased: true,
        coursePic: require('../assets/coursesPic/flutter.png'),
        tutorPic: require('../assets/tutorsPic/jason.jpg'),
        id: '3'
    },
    {
        title: 'JavaScript',
        description: '教你JS',
        tutor: 'Jason Lee',
        numOfLessons: 9,
        price: 110,
        aveScore: 3.7,
        numOfStudents: 13,
        isPurchased: false,
        coursePic: require('../assets/coursesPic/javaScript.png'),
        tutorPic: require('../assets/tutorsPic/jason.jpg'),
        id: '4'
    },
    {
        title: 'Jest',
        description: '教你寫Test',
        tutor: 'Beeno Tung',
        numOfLessons: 3,
        price: 180,
        aveScore: 2.6,
        numOfStudents: 18,
        isPurchased: false,
        coursePic: require('../assets/coursesPic/jest.png'),
        tutorPic: require('../assets/tutorsPic/beeno.jpg'),
        id: '5'
    },
    {
        title: 'Knex',
        description: '教你寫migration',
        tutor: 'Andrew Shek',
        numOfLessons: 2,
        price: 130,
        aveScore: 3.2,
        numOfStudents: 23,
        isPurchased: true,
        coursePic: require('../assets/coursesPic/knex.png'),
        tutorPic: require('../assets/tutorsPic/andrew.jpg'),
        id: '6'
    },
    {
        title: 'Flutter',
        description: '教你寫App',
        tutor: 'Andrew Shek',
        numOfLessons: 12,
        price: 160,
        aveScore: 5.0,
        numOfStudents: 45,
        isPurchased: false,
        coursePic: require('../assets/coursesPic/flutter.png'),
        tutorPic: require('../assets/tutorsPic/andrew.jpg'),
        id: '7'
    },
    {
        title: 'Python',
        description: '教你寫Python',
        tutor: 'Dragon Lung',
        numOfLessons: 12,
        price: 190,
        aveScore: 1.2,
        numOfStudents: 19,
        isPurchased: false,
        coursePic: require('../assets/coursesPic/python.png'),
        tutorPic: require('../assets/tutorsPic/dragon.jpg'),
        id: '8'
    },
    {
        title: 'React',
        description: '兩日學識React',
        tutor: 'Alex Lau',
        numOfLessons: 3,
        price: 200,
        aveScore: 3.2,
        numOfStudents: 34,
        isPurchased: true,
        coursePic: require('../assets/coursesPic/react.png'),
        tutorPic: require('../assets/tutorsPic/alex.jpeg'),
        id: '9'
    },
    {
        title: 'React Native',
        description: '三日學識React Native',
        tutor: 'Alex Lau',
        numOfLessons: 5,
        price: 250,
        aveScore: 4.5,
        numOfStudents: 47,
        isPurchased: true,
        coursePic: require('../assets/coursesPic/reactNative.png'),
        tutorPic: require('../assets/tutorsPic/alex.jpeg'),
        id: '10'
    },
    {
        title: 'TensorFlow',
        description: '三日學識AI',
        tutor: 'Beeno Tung',
        numOfLessons: 12,
        price: 170,
        aveScore: 2.8,
        numOfStudents: 29,
        isPurchased: false,
        coursePic: require('../assets/coursesPic/tensorFlow.png'),
        tutorPic: require('../assets/tutorsPic/beeno.jpg'),
        id: '11'
    },
    {
        title: 'TypeScript',
        description: '三日學識Type Script',
        tutor: 'Dragon Lung',
        numOfLessons: 3,
        price: 140,
        aveScore: 3.6,
        numOfStudents: 25,
        isPurchased: false,
        coursePic: require('../assets/coursesPic/typeScript.jpg'),
        tutorPic: require('../assets/tutorsPic/dragon.jpg'),
        id: '12'
    }
];

export default function coursesTestData(category: string) {
    let start: number, end: number;

    switch (category) {
        case 'inProgress':
            [start, end] = [0, 5];
            break;
        case 'completed':
            [start, end] = [6, 11];
            break;
        default:
            [start, end] = [0, 11];
    }

    let value = [];
    for (let i = start; i <= end; i++) {
        value.push(courses[i])
    }

    return value
};
