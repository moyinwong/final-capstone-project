export default interface ICourse {
    course_name?: string | number | null
    objective?: string | number | null
    course_description?: string | number | null
    prerequisites?: string | number | null
    price?: string | number | null
    id?: string | number | null
    category_id?: string | number | null
    subcategory_id?: string | number | null
    purchased_users_num?: string | number | null
    rated_num?: string | number | null
    rated_score?: string | number | null
    tutor_name?: string | number | null
    tutor_image?: string | number | null
    image?: string | number | null
    lessons_number?: string | number | null
}
