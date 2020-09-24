import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import FlattedCard from "../components/FlattedCard";
import { IRootState } from "../redux/store";
import "./CartPage.scss";

const CartPage: React.FC = () => {
  const cartCourses = useSelector((state: IRootState) => state.cart.courses);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let priceSum: number = 0;
    for (let course of cartCourses) {
      priceSum += parseFloat(course.price);
    }
    setTotalPrice(priceSum);
  }, [cartCourses]);

  return (
    <>
      {cartCourses && (
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

            <Button variant="primary" size="lg" block>
              立即付款
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
