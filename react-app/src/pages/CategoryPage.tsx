import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Card } from "react-bootstrap";

import { Button } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import "./CategoryPage.scss";
import NotFound from "./NotFound";
import FlattedCard from "../components/FlattedCard";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Form } from "react-bootstrap";

export interface ICourse {
  course_name: string;
  objective: string;
  prerequisites: string;
  price: string;
  id: number;
  category_id: number;
  purchased_users_num: string;
  rated_num: string;
  rated_score: string | null;
  tutor_name: string;
  image: string;
  lessons_number: number;
}

const CategoryPage: React.FC = () => {
  const [initCourses, setInitCourses] = useState<Array<ICourse>>([]);
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [orderMethod, setOrderMethod] = useState("最受歡迎");
  const [ratingSelection, setRatingSelection] = useState("0");
  const param: { categoryName: string } = useParams();

  const { categoryName } = param;

  //to check current route
  let location = useLocation();

  const getAllCoursesByCategory = async () => {
    let queryRoute: string = "/category/";

    //if is "others" category, change the api route
    if (location.pathname.match(/others/)) {
      queryRoute += "others/";
    }

    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${categoryName}`
    );

    //if no such category
    if (fetchRes.status === 500) {
      return <NotFound />;
    }

    const result = await fetchRes.json();
    const { courses } = result;
    const orderedCourses = courses.slice();
    orderedCourses.sort(
      (a: ICourse, b: ICourse) =>
        parseInt(b.purchased_users_num) - parseInt(a.purchased_users_num)
    );

    setCourses(orderedCourses);
    //for reset
    setInitCourses(orderedCourses);
  };

  //handle order button click
  function handleOrderButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (orderMethod === "event.currentTarget.innerHTML") {
      return;
    }
    const newMethod = event.currentTarget.innerHTML;
    setOrderMethod(newMethod);
    const newOrderedCourses = courses.slice();
    if (newMethod === "最受歡迎") {
      newOrderedCourses.sort(
        (a, b) =>
          parseInt(b.purchased_users_num) - parseInt(a.purchased_users_num)
      );
    } else if (newMethod === "最低價錢") {
      newOrderedCourses.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (newMethod === "最受好評") {
      newOrderedCourses.sort(
        (a, b) =>
          (b.rated_score ? parseFloat(b.rated_score) : 0) -
          (a.rated_score ? parseFloat(a.rated_score) : 0)
      );
    }
    setCourses(newOrderedCourses);
  }

  //handle rating selection, if not 0, set to element's id, otherwise reset
  function handleRatingFormClick(event: React.MouseEvent<HTMLInputElement>) {
    console.log(event.currentTarget.checked);
    if (ratingSelection !== "0") {
      setRatingSelection("0");
      return;
    }
    setRatingSelection(event.currentTarget.id);
  }

  //if rating selection change, courses list will reset / change filter
  useEffect(() => {
    const newOrderedCourses = initCourses.filter((e) => {
      return (
        parseFloat(e.rated_score ? e.rated_score : "0") >=
        parseFloat(ratingSelection)
      );
    });
    setCourses(newOrderedCourses);
  }, [ratingSelection]);

  //handle rating on change
  function handleRatingFormChange(event: any) {}

  //control panel
  const panelStyle = {
    width: isFilterOpen ? 300 : 0,
    transition: "all 0.2s ease-in",
  };

  const cardStyle = {
    border: isFilterOpen ? "1px solid rgba(0,0,0,.125)" : "none",
    transition: "all 0.2s",
  };

  //run once when init
  useEffect(() => {
    getAllCoursesByCategory();
  }, []);

  return (
    <div className={"category-main-container"}>
      <div>
        <h1>所有{categoryName}課程</h1>
      </div>
      <div className="button-container">
        <Button
          variant="outline-secondary"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          篩選
        </Button>

        <DropdownButton
          variant="outline-secondary"
          id="dropdown-basic-button"
          title={orderMethod}
        >
          <Dropdown.Item onClick={handleOrderButtonClick}>
            最受歡迎
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOrderButtonClick}>
            最低價錢
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOrderButtonClick}>
            最受好評
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className={"panel-card-container"}>
        <div className={"panel"} style={panelStyle}>
          <Accordion defaultActiveKey="0">
            <Card style={cardStyle}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                評分
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div>
                    <Form>
                      <Form.Check
                        className="rating-form"
                        type="radio"
                        id={"4.5"}
                        label={"4.5"}
                        onClick={handleRatingFormClick}
                        onChange={handleRatingFormChange}
                        checked={ratingSelection === "4.5"}
                      />
                      <Form.Check
                        className="rating-form"
                        type="radio"
                        id={"4"}
                        label={"4"}
                        onClick={handleRatingFormClick}
                        onChange={handleRatingFormChange}
                        checked={ratingSelection === "4"}
                      />
                      <Form.Check
                        className="rating-form"
                        type="radio"
                        id={"3.5"}
                        label={"3.5"}
                        onClick={handleRatingFormClick}
                        onChange={handleRatingFormChange}
                        checked={ratingSelection === "3.5"}
                      />
                    </Form>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion defaultActiveKey="0">
            <Card style={cardStyle}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                價錢
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>價錢選項</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>

        <div className="all-course-container">
          {courses.slice(0, 10).map((course, i) => (
            <FlattedCard key={i} {...course}></FlattedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
