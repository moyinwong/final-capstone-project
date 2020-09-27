const tutors = [
    {
        name: 'Alex Lau',
        pic: require('../assets/tutorsPic/alex.jpeg'),
        title: '首席導師',
        team: '科啟學院',
        description: 'Alex 曾榮獲多項本地及亞太科技大獎，作為多家科技公司的顧問和 Play More Limited 前首席技術官，他具備軟件開發和管理的專業知識。',
        numSubscribed: 100,
        isSubscribed: true,
        id: '1'
    },
    {
        name: 'Gordon Lau',
        pic: require('../assets/tutorsPic/gordon.jpg'),
        title: '​課程總監',
        team: '科啟學院',
        description: '前 Accelerate HK 首席技術官。曾於多間不同行業規模的公司參與軟件開發的工作。超過10年編程經驗，同時有超過2年編程教育經驗。',
        numSubscribed: 120,
        isSubscribed: true,
        id: '2'
    },
    {
        name: 'Jason Lee',
        pic: require('../assets/tutorsPic/jason.jpg'),
        title: '課程講師',
        team: '科啟學院',
        description: 'Jason 沉心於編寫程式和程式教學，他加入 Tecky 之前本地一間物聯網公司作為商業智能分析師，主要負責分析源數據去解決客戶的問題。',
        numSubscribed: 105,
        isSubscribed: false,
        id: '3'
    },
    {
        name: 'Andrew Shek',
        pic: require('../assets/tutorsPic/andrew.jpg'),
        title: '課程講師',
        team: '科啟學院',
        description: '曾任職不同範疇公司R&D軟件工程師，例如，長者智能居家安全系統、生物科技、金融科技、電子消費品及客制化Microsoft產品解決方案。',
        numSubscribed: 70,
        isSubscribed: false,
        id: '4'
    },
    {
        name: 'Dragon Lung',
        pic: require('../assets/tutorsPic/dragon.jpg'),
        title: '課程講師',
        team: '科啟學院',
        description: 'Dragon是一位充滿熱誠的初創企業家，熱衷於探索最新的技術並應用在真實世界當中。Dragon加入科啟學院之前，一直在自己創立的初創企業中創業。',
        numSubscribed: 90,
        isSubscribed: true,
        id: '5'
    },
    {
        name: 'Beeno Tung',
        pic: require('../assets/tutorsPic/beeno.jpg'),
        title: '首課程講師',
        team: '科啟學院',
        description: 'Beeno 曾任香港理工大學助教。現為理大和一間本地金融科技初創公司的區塊鏈與大數據技術研發人員。',
        numSubscribed: 120,
        isSubscribed: false,
        id: '6'
    }
];

export default function tutorsTestData(category: string) {
    let start: number, end: number;

    switch (category) {
        case 'subscribed':
            [start, end] = [0, 3];
            break;
        default:
            [start, end] = [0, 5];
    }

    let value = [];
    for (let i = start; i <= end; i++) {
        value.push(tutors[i])
    }

    return value
};
