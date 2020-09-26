import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import FlattedCard from "../components/FlattedCard";
import { removeCourse } from "../redux/cart/actions";
import { IRootState } from "../redux/store";
import "./CartPage.scss";
import { ICourse } from "./CategoryPage";

interface IUserCourse {
  userEmail: string;
  course_name: string;
}

const CartPage: React.FC = () => {
  const cartCourses: ICourse[] = useSelector(
    (state: IRootState) => state.cart.courses
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const userEmail = useSelector((state: IRootState) => state.auth.email);
  const token = localStorage.getItem("token");
  const [userCourses, setUserCourses] = useState<IUserCourse[] | null>(null);
  const [isReadyRender, setIsReadyRender] = useState(false);

  const dispatch = useDispatch();

  const currentLocation = useLocation();

  useEffect(() => {
    document.getElementById("website-header")!.style.display = "block";
  }, []);

  useEffect(() => {
    if (userEmail) {
      getUserAllCourses(userEmail);
    }
  }, [userEmail, cartCourses]);

  useEffect(() => {
    if (!cartCourses) return;
    updateCartAfterFetch();
  }, [userCourses]);

  //prevent showing course if user already buy
  const updateCartAfterFetch = async () => {
    console.log(userEmail);
    if (userEmail && userCourses) {
      console.log("haha");
      cartCourses.forEach((e) => {
        console.log("here  " + e.course_name);
        console.log("user course" + userCourses);
        for (let purchasedCourse of userCourses) {
          console.log(e.course_name);
          console.log(purchasedCourse.course_name);
          if (e.course_name === purchasedCourse.course_name) {
            dispatch(removeCourse(e.course_name));
          }
        }
      });
    }

    let priceSum: number = 0;
    for (let course of cartCourses) {
      priceSum += parseFloat(course.price);
    }
    setTotalPrice(priceSum);
    setIsReadyRender(true);
  };

  const getUserAllCourses = async (userEmail: string) => {
    let queryRoute: string = "/user/";
    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${userEmail}/course/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(fetchRes);
    const { courses } = await fetchRes.json();
    console.log(courses);
    setUserCourses(courses);
    console.log(userCourses);
  };

  const handleCheckOut = async () => {};

  return (
    <>
      {cartCourses && userEmail !== undefined && isReadyRender && (
        <>
          <div className="cart-title">
            <p>購物車</p>
          </div>
          <div className="cart-card-container">
            {cartCourses.map((e, i) => {
              return (
                <div className="card-div" key={i}>
                  <FlattedCard {...{ ...e, trash: true }} />
                </div>
              );
            })}
          </div>
          <div className="cart-bottom-container">
            <div>
              <div>
                <p>合共：</p>
              </div>
              <div>
                <p>HK$ {totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {userEmail ? (
              <Button variant="primary" size="lg" block>
                <Link to={currentLocation}></Link>
              </Button>
            ) : (
              <Button variant="primary" size="lg" block>
                <Link
                  to={{ pathname: "/login", state: { url: currentLocation } }}
                >
                  請先登入
                </Link>
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
