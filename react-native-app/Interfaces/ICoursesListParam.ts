// Interfaces
import ITutor from './ITutor';

export default interface ICoursesListParam {
    subject?: string | null
    tutor?: ITutor | null
    user?: string | null
    completedCourse?: boolean | null
}
