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
        title: '綜合科學',
        pic: require('../assets/subjectsPic/sci.jpg'),
        id: '8'
    },
    {
        title: 'M1',
        pic: require('../assets/subjectsPic/m1.jpg'),
        id: '9'
    },
    {
        title: 'M2',
        pic: require('../assets/subjectsPic/m2.jpeg'),
        id: '10'
    },
    {
        title: '企會財',
        pic: require('../assets/subjectsPic/bafs.jpg'),
        id: '11'
    },
    {
        title: '經濟',
        pic: require('../assets/subjectsPic/econ.jpg'),
        id: '12'
    },
    {
        title: '中國文學',
        pic: require('../assets/subjectsPic/chnLi.jpg'),
        id: '13'
    },
    {
        title: '英國文學',
        pic: require('../assets/subjectsPic/engLi.jpg'),
        id: '14'
    },
    {
        title: '中國歷史',
        pic: require('../assets/subjectsPic/chnHis.jpg'),
        id: '15'
    },
    {
        title: '歷史',
        pic: require('../assets/subjectsPic/his.jpg'),
        id: '16'
    },
    {
        title: '地理',
        pic: require('../assets/subjectsPic/geo.jpg'),
        id: '17'
    },
    {
        title: '倫理與宗教',
        pic: require('../assets/subjectsPic/rsc.jpg'),
        id: '18'
    },
    {
        title: '旅遊與款待',
        pic: require('../assets/subjectsPic/tour.jpg'),
        id: '19'
    },
    {
        title: '設計與科技',
        pic: require('../assets/subjectsPic/dt.jpg'),
        id: '20'
    },
    {
        title: '資訊及通訊科技',
        pic: require('../assets/subjectsPic/ict.jpg'),
        id: '21'
    },
    {
        title: '音樂',
        pic: require('../assets/subjectsPic/music.jpg'),
        id: '22'
    },
    {
        title: '視覺藝術',
        pic: require('../assets/subjectsPic/arts.jpg'),
        id: '23'
    },
    {
        title: '體育',
        pic: require('../assets/subjectsPic/pe.jpg'),
        id: '24'
    }
];

export default function subjectsData(category: string) {
    let start: number, end: number;

    switch (category) {
        case 'main':
            [start, end] = [0, 3];
            break;
        case 'science':
            [start, end] = [4, 9];
            break;
        case 'business':
            [start, end] = [10, 11];
            break;
        case 'linguistic':
            [start, end] = [12, 16];
            break;
        case 'other':
            [start, end] = [17, 23];
            break;
        default:
            [start, end] = [0, 23];
    }

    let value = [];
    for (let i = start; i <= end; i++) {
        value.push(subjects[i])
    }

    return value
};
