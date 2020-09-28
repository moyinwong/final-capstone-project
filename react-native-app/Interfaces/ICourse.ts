export default interface ICourse {
    title?: string | null
    description?: string | null
    tutor?: string | null
    numOfLessons?: number | null
    price?: number | null
    aveScore?: number | null
    numOfStudents?: number | null
    isPurchased?: boolean | null
    coursePic?: any | null
    tutorPic?: any | null
    id?: string | number | null
}
