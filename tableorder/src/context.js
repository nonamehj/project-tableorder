import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
import data from "./data";
import reducer from "./reducer";
const initialState = {
  menus: data,
  count: 0, //한사람의 구매 수량
  isModalOpen: false,
  isOrderOpen: false,
  isOrderCompleted: false,
  modalItem: [],
  totalItem: [],
  total: 0,
  todayOrder: 0, //오늘 이용객 카운트
};
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isCoffee, setIsCoffee] = useState(false);
  const toggleCoffee = useCallback((value) => {
    setIsCoffee(value);
  }, []);
  /*메뉴바 버튼설정 */
  const toggleCategories = useCallback((category) => {
    if (category === "전체") {
      dispatch({ type: "CATEGORY_BTN", payload: { category, data } });
    } else {
      let tempItem = data.filter((item) => item.category === category);
      dispatch({ type: "CATEGORY_BTN", payload: { tempItem, category } });
    }
  }, []);
  /*아이템 추가/닫기 모달창 */
  const isShowModal = useCallback(
    (id, category) => {
      let count = state.count + 1;
      dispatch({ type: "SHOW_MODAL", payload: { id, category, count } });
    },
    [state.count]
  );
  const isCloseModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const addCoffeeSize = useCallback((size) => {
    dispatch({ type: "MODAL_COFFEE_SIZE", payload: size });
  }, []);
  const modalQuantity = useCallback((type, addType) => {
    dispatch({ type: "MODAL_QUANTITY", payload: { type, addType } });
  }, []);
  const modalTotalItem = useCallback(() => {
    let count = state.count + 1;
    dispatch({ type: "MODAL_TOTAL_ITEM", payload: count });
  }, [state.count]);
  /* */

  /* addItem 위치*/
  const addItemAmount = useCallback((order, type) => {
    dispatch({ type: "ADDITEM_AMOUNT", payload: { order, type } });
  }, []);
  const addItemRemove = useCallback((order) => {
    dispatch({ type: "ADDITEM_REMOVE", payload: order });
  }, []);
  /* 마지막 절차 주문오더 결제하기*/
  const orderItems = useCallback(() => {
    dispatch({ type: "FINAL_ITEMS_ORDER" });
  }, []);
  const orderListRemove = useCallback(() => {
    dispatch({ type: "ORDER_LIST_REMOVE" });
  }, []);
  const orderCompleted = useCallback(() => {
    let count = state.todayOrder + 1;
    dispatch({ type: "ORDER_COMPLETED", payload: count });
  }, [state.todayOrder]);

  const isComplete = useCallback(() => {
    dispatch({ type: "ORDER_SUCCESS" });
  }, []);
  /*아이템 전체금액표시 */
  useEffect(() => {
    dispatch({ type: "TOTAL_ITEMS_PAYMENT" });
  }, [state.totalItem]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleCategories,
        isShowModal,
        isCloseModal,
        addItemAmount,
        addItemRemove,
        addCoffeeSize,
        modalQuantity,
        modalTotalItem,
        orderItems,
        orderListRemove,
        orderCompleted,
        isComplete,
        toggleCoffee,
        isCoffee,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
