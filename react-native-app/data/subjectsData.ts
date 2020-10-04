const subjects = [
    {
        title: '中文',
        pic: require('../assets/subjectsPic/chn.jpg'),
        id: '1'
    },
    {
        title: '英文',
        pic: require('../assets/subjectsPic/eng.jpg'),
        id: '2'
    },
    {
        title: '數學',
        pic: require('../assets/subjectsPic/maths.jpg'),
        id: '3'
    },
    {
        title: '通識',
        pic: require('../assets/subjectsPic/ls.jpg'),
        id: '4'
    },
    {
        title: '物理',
        pic: require('../assets/subjectsPic/phy.jpg'),
        id: '5'
    },
    {
        title: '化學',
        pic: require('../assets/subjectsPic/chem.jpg'),
        id: '6'
    },
    {
        title: '生物',
        pic: require('../assets/subjectsPic/bio.jpg'),
        id: '7'
    },
    {
        title: 'M1',
        pic: require('../assets/subjectsPic/m1.jpg'),
        id: '8'
    },
    {
        title: 'M2',
        pic: require('../assets/subjectsPic/m2.jpeg'),
        id: '9'
    },
    {
        title: '經濟',
        pic: require('../assets/subjectsPic/econ.jpg'),
        id: '10'
    },
    {
        title: '企會財',
        pic: require('../assets/subjectsPic/bafs.jpg'),
        id: '11'
    },
    {
        title: '歷史',
        pic: require('../assets/subjectsPic/his.jpg'),
        id: '12'
    },
    {
        title: '視覺藝術',
        pic: require('../assets/subjectsPic/arts.jpg'),
        id: '13'
    },
    {
        title: '編程',
        pic: require('../assets/subjectsPic/coding.jpg'),
        id: '14'
    },
    {
        title: 'ICT',
        pic: require('../assets/subjectsPic/ict.jpg'),
        id: '15'
    },
    {
        title: '廚藝',
        pic: require('../assets/subjectsPic/cooking.jpg'),
        id: '16'
    },
    {
        title: 'DIY',
        pic: require('../assets/subjectsPic/diy.jpg'),
        id: '17'
    },
    {
        title: '美容',
        pic: require('../assets/subjectsPic/beauty.jpeg'),
        id: '18'
    },
];

export default function subjectsData(category: string) {
    let start: number, end: number;

    switch (category) {
        case 'main':
            [start, end] = [0, 3];
            break;
        case 'science':
            [start, end] = [4, 8];
            break;
        case 'business':
            [start, end] = [9, 10];
            break;
        case 'linguistic':
            [start, end] = [11, 12];
            break;
        case 'other':
            [start, end] = [13, 17];
            break;
        default:
            [start, end] = [0, 17];
    }

    let value = [];
    for (let i = start; i <= end; i++) {
        value.push(subjects[i])
    }

    return value
};
