import "./AddItemsStyle.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { useState } from "react";
const AddItems = () => {
  const { totalItem, addItemAmount, addItemRemove, total, orderItems } =
    useGlobalContext();
  const [value, setValue] = useState(0);
  const prevBtn = () => {
    let prev = value - 1;
    if (prev < 0) {
      prev = 0;
    }
    return setValue(prev);
  };
  const nextBtn = () => {
    let next = value + 1;
    if (next > totalItem.length - 1) {
      next = totalItem.length - 1;
    }
    return setValue(next);
  };
  return (
    <section className="addItems">
      <div className="addItems-container">
        <article className="addItems-center">
          <button
            onClick={prevBtn}
            className={`${value >= 1 ? "prev-btn" : "isShowBtn"}`}
          >
            <FaChevronLeft />
          </button>
          <div className="addItem-list">
            {totalItem.map((item, index) => {
              const { img, title, amount, order } = item;
              let position = "";
              if (totalItem.length >= 3 && value >= 1) {
                if (index === value || index < value + 1) {
                  position = "activeSlide";
                }
                if (index < value) {
                  position = "lastSlide";
                }
              }

              return (
                <article key={order} className={`${position} addItem-article`}>
                  <button
                    className="addItem-remove"
                    onClick={() => addItemRemove(order)}
                  >
                    <FaTimes />
                  </button>
                  <div className="addItem-item">
                    <img src={img} alt={title} className="addItem-img" />
                  </div>
                  <p>{title}</p>
                  <div className="addItem-btn">
                    <button onClick={() => addItemAmount(order, "dec")}>
                      <AiOutlineMinus />
                    </button>
                    <h3>{amount}</h3>
                    <button onClick={() => addItemAmount(order, "inc")}>
                      <AiOutlinePlus />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <button
            onClick={nextBtn}
            className={`${
              totalItem.length >= 3
                ? totalItem.length >= 6
                  ? "next-btn2"
                  : "next-btn"
                : "isShowBtn"
            }`}
          >
            <FaChevronRight />
          </button>
        </article>
        <article className="addItem-total">
          <h3>
            전체금액 <span>{total.toLocaleString()}원</span>
          </h3>
          <button className="payment" onClick={orderItems}>
            주문 확인
          </button>
        </article>
      </div>
    </section>
  );
};

export default AddItems;
