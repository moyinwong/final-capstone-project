import { countReset } from "console";
import React from "react";
import { ICourse } from "../pages/CategoryPage";

const FlattedCard = (props: ICourse) => {
  return <div>{props.course_name}</div>;
};

export default FlattedCard;
