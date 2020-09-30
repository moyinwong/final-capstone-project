import React from "react";
import "./PaymentSuccessAlert.scss";

const PaymentSuccessAlert: React.FC = () => {
  return (
    <div className="payment-alert-container">
      <i className="fas fa-check-circle"></i>
      <p className="alert-message">已成功付款</p>
    </div>
  );
};

export default PaymentSuccessAlert;
