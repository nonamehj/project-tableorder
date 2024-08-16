import "./ModalItemStyle.css";
import { useState, useEffect } from "react";
import { useGlobalContext } from "./../context";
import { FaTimes } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ModalItem = () => {
  const {
    modalItem,
    isCloseModal,
    isModalOpen,
    addCoffeeSize,
    modalQuantity,
    modalTotalItem,
    toggleCoffee,
    isCoffee,
  } = useGlobalContext();
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(0);
  }, [isModalOpen]);
  useEffect(() => {
    if (modalItem.length > 0) {
      toggleCoffee(modalItem[0].category === "커피");
    }
  }, [toggleCoffee, modalItem]);
  return (
    <section className={isModalOpen ? "modal-section modal" : "modal"}>
      <div className="modal-container">
        <button className="modal-close" onClick={isCloseModal}>
          <FaTimes />
        </button>
        {modalItem.map((item) => {
          const {
            id,
            img,
            title,
            category,
            coffeeSize,
            amount,
            shot,
            icecream,
          } = item;
          return (
            <article key={id} className="modal-item">
              <div className="modal-img">
                <img src={img} alt={`${category}-img`} className="single-img" />
              </div>
              <h3>{title}</h3>
              <div className="modal-info">
                <div className="coffee-row">
                  <h3>사이즈</h3>
                  <div className="btn-row">
                    {coffeeSize.map((coffee, index) => {
                      return (
                        <button
                          key={coffee}
                          className={`${
                            value === index
                              ? "coffee-size active-size"
                              : "coffee-size"
                          }`}
                          name={coffee}
                          onClick={(e) => {
                            addCoffeeSize(e.target.name);
                            setValue(index);
                          }}
                        >
                          {coffee}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="coffee-row">
                  <h3>수량</h3>
                  <div className="btn-row">
                    <button
                      className="minus"
                      onClick={() => modalQuantity("dec", "amount")}
                    >
                      <AiOutlineMinus />
                    </button>
                    <h3>{amount}</h3>
                    <button
                      className="plus"
                      onClick={() => modalQuantity("inc", "amount")}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <div className="coffee-row">
                  <h3>샷 추가</h3>
                  <div className="btn-row">
                    <button
                      className="minus"
                      onClick={() => modalQuantity("dec", "shot")}
                      disabled={!isCoffee}
                    >
                      <AiOutlineMinus />
                    </button>
                    <h3>{shot}</h3>
                    <button
                      className="plus"
                      onClick={() => modalQuantity("inc", "shot")}
                      disabled={!isCoffee}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <div className="coffee-row">
                  <h3>아이스크림 추가</h3>
                  <div className="btn-row">
                    <button
                      className="minus"
                      onClick={() => modalQuantity("dec", "icecream")}
                      disabled={!isCoffee}
                    >
                      <AiOutlineMinus />
                    </button>
                    <h3>{icecream}</h3>
                    <button
                      className="plus"
                      onClick={() => modalQuantity("inc", "icecream")}
                      disabled={!isCoffee}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
        <button className="order-btn" onClick={modalTotalItem}>
          장바구니에 추가
        </button>
      </div>
    </section>
  );
};

export default ModalItem;
