import React from "react";
import "./OrderCompletedStyle.css";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
const OrderCompleted = () => {
  const { isOrderCompleted, todayOrder, isComplete } = useGlobalContext();

  return (
    <section className={isOrderCompleted ? "section-order" : "order"}>
      <div className="order-container">
        <button className="order-close" onClick={isComplete}>
          <FaTimes />
        </button>
        <h3>주문번호 {todayOrder}</h3>
        <div className="completed-center">
          <h3>주문이 완료되었습니다.</h3>
        </div>
        <button className="complete" onClick={isComplete}>
          <h3>주문 완료</h3>
        </button>
      </div>
    </section>
  );
};

export default OrderCompleted;
