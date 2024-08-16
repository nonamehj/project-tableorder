import "./OrderCheckStyle.css";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
const OrderCheck = () => {
  const { isOrderOpen, totalItem, total, orderListRemove, orderCompleted } =
    useGlobalContext();

  return (
    <section className={isOrderOpen ? "section-order" : "order"}>
      <div className="order-container">
        <button className="order-close" onClick={orderListRemove}>
          <FaTimes />
        </button>
        <h3>주문내역</h3>
        <div className="order-items">
          <div className="order-items-center">
            {totalItem.map((item) => {
              const { order, title, img, icecream, amount, shot, size } = item;

              return (
                <article key={order} className="order-item">
                  <img src={img} alt="order-img" className="list-img" />
                  <div className="order-item-info">
                    <h3>{title}</h3>
                    <h3>사이즈 : {size}</h3>
                    <h3>수량 : {amount}</h3>
                    {shot && shot > 0 ? <h3>샷 추가 : {shot}</h3> : null}
                    {icecream && icecream > 0 ? (
                      <h3>아이스크림 추가: {icecream}</h3>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="total-price">
          <h3>총 금액 : {total.toLocaleString()}</h3>
          <button onClick={orderCompleted}>최종 주문</button>
        </div>
      </div>
    </section>
  );
};

export default OrderCheck;
