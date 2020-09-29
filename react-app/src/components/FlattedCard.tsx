import { push } from "connected-react-router";
import React from "react";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { ICourse } from "../pages/CategoryPage";
import { removeCourse } from "../redux/cart/actions";
import "./FlattedCard.scss";

const FlattedCard = (props: ICourse) => {
  const dispatch = useDispatch();
  function handleContentClick(event: React.MouseEvent) {
    const courseName = event.currentTarget.firstElementChild?.innerHTML;
    if (courseName) dispatch(push("/course/" + courseName));
  }
  function handleImgClick(event: React.MouseEvent) {
    const courseName = event.currentTarget.getAttribute("alt");
    if (courseName) dispatch(push("/course/" + courseName));
  }
  return (
    <div className="course-container">
      {/* {console.log(props)} */}
      {props.image.match(/http/) ? (
        <div>
          <img
            src={props.image}
            alt={props.course_name}
            onClick={handleImgClick}
          />
        </div>
      ) : (
        <div className='img-container'>
          <img
            src={"http://localhost:8080/img/" + props.image}
            alt={props.course_name}
            onClick={handleImgClick}
          />
        </div>
      )}
      <div className="course-content-price-container">
        <div className="course-content" onClick={handleContentClick}>
          {<div className="course-name">{props.course_name}</div>}
          {<div className="course-objective">{props.objective}</div>}
          {<div className="tutor-name">{props.tutor_name}</div>}
          {
            <div className="lessons-number">
              {"總共堂數: " + props.lessons_number}
            </div>
          }
          <div className="rating">
            <div className="decimal">
              {parseFloat(props.rated_score ? props.rated_score : "0").toFixed(
                2
              )}
            </div>
            <Rating
              stop={5}
              emptySymbol={[
                "far fa-star fa-2x",
                "far fa-star fa-2x",
                "far fa-star fa-2x",
                "far fa-star fa-2x",
                "far fa-star fa-2x",
              ]}
              fullSymbol={[
                "fas fa-star fa-2x",
                "fas fa-star fa-2x",
                "fas fa-star fa-2x",
                "fas fa-star fa-2x",
                "fas fa-star fa-2x",
              ]}
              readonly={true}
              initialRating={parseFloat(
                props.rated_score ? props.rated_score : "0"
              )}
            />
            <span>({props.rated_num})</span>
          </div>
        </div>
        {
          <div className="price">
            {"HK$ " + props.price}
            {props.trash && (
              <i
                className="fas fa-trash-alt"
                onClick={() => dispatch(removeCourse(props.course_name))}
              ></i>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default FlattedCard;
