with t1 AS(
    select
        "courses"."name" as "course_name",
        "courses"."objective",
        "courses"."prerequisites",
        "courses"."price",
        "courses"."id",
        "users"."name" as "tutor_name",
        "courses"."image",
        avg("rated_score"),
        count("users"."id") as "students"
    from
        "purchased_courses"
        right join "courses" on "courses"."id" = "purchased_courses"."course_id"
        left join "users" on "users"."id" = "courses"."tutor_id"
    group by
        "courses"."name",
        "courses"."objective",
        "courses"."prerequisites",
        "courses"."price",
        "courses"."id",
        "users"."name",
        "courses"."image"
)
select
    *
from
    t1 with "T1" as (
        select
            "courses"."name" as "course_name",
            "courses"."objective",
            "courses"."prerequisites",
            "courses"."price",
            "courses"."id",
            "users"."name" as "tutor_name",
            "courses"."image",
            avg("rated_score"),
            count("users"."id") as "students"
            right join "courses" on "courses"."id" = "purchased_courses"."course_id"
            left join "users" on "users"."id" = "courses"."tutor_id"
        group by
            "courses"."name",
            "courses"."objective",
            "courses"."prerequisites",
            "courses"."price",
            "courses"."id",
            "users"."name",
            "courses"."image"
    )
select
    *
from
    "T1"

INSERT into mc_answers(question_id, answer_body, is_correct_answer) VALUES (12, 'testing', true);




select
 COUNT (purchased_courses.id) as total_student
 from courses 
 JOIN purchased_courses on courses.id = purchased_courses.course_id
 where tutor_id = 3;

 SELECT * 
 FROM courses
 JOIN purchased_courses on courses.id = purchased_courses.course_id
 WHERE courses.tutor_id = 3;