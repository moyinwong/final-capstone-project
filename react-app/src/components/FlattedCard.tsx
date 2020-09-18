import React from "react";
import Rating from "react-rating";
import { ICourse } from "../pages/CategoryPage";
import "./FlattedCard.scss";

const FlattedCard = (props: ICourse) => {
  return (
    <div className="course-container">
      {/* {console.log(props)} */}
      {props.image.match(/http/) ? (
        <div>
          <img src={props.image} />
        </div>
      ) : (
        <div>
          <img src={"http://localhost:8080/img/" + props.image} />
        </div>
      )}
      <div className="course-content-price-container">
        <div className="course-content">
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
        {<div className="price">{"HK$ " + props.price}</div>}
      </div>
    </div>
  );
};

export default FlattedCard;
