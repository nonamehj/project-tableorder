import {
  CATEGORY_BTN,
  SHOW_MODAL,
  CLOSE_MODAL,
  MODAL_COFFEE_SIZE,
  MODAL_QUANTITY,
  MODAL_TOTAL_ITEM,
  ADDITEM_AMOUNT,
  ADDITEM_REMOVE,
  FINAL_ITEMS_ORDER,
  ORDER_LIST_REMOVE,
  ORDER_COMPLETED,
  ORDER_SUCCESS,
  TOTAL_ITEMS_PAYMENT,
} from "./actions";

const reducer = (state, action) => {
  /*사이드바 버튼 */
  if (action.type === CATEGORY_BTN) {
    if (action.payload.category === "전체") {
      return { ...state, menus: action.payload.data };
    } else {
      return { ...state, menus: action.payload.tempItem };
    }
  }
  /* 아이템 모달 오픈 */
  if (action.type === SHOW_MODAL) {
    // if (
    //   action.payload.category === "에이드" ||
    //   action.payload.category === "스무디" ||
    //   action.payload.category === "티"
    // ) {
    //   let tempItem = state.menus
    //     .filter((item) => item.id === action.payload.id)
    //     .map((item) => {
    //       return {
    //         ...item,
    //         order: action.payload.count,
    //         amount: 1,
    //         itemTotal: item.price,
    //       };
    //     });
    //   return {
    //     ...state,
    //     count: action.payload.count,
    //     totalItem: [...state.totalItem, ...tempItem],
    //   };
    // }
    let tempItem = state.menus
      .filter((item) => item.id === action.payload.id)
      .map((item) => {
        return {
          ...item,
          amount: 1,
          shot: 0,
          icecream: 0,
          size: "short",
          itemTotal: item.price,
        };
      });
    return { ...state, modalItem: tempItem, isModalOpen: true };
  }
  /* modal 아이템 모달  닫기*/
  if (action.type === CLOSE_MODAL) {
    return { ...state, isModalOpen: false, modalItem: [] };
  }
  /* modal 사이즈 수량 추가 등*/
  if (action.type === MODAL_COFFEE_SIZE) {
    let tempItem = state.modalItem.map((item) => {
      if (action.payload === "short") {
        return { ...item, size: action.payload, itemTotal: item.price };
      }
      if (action.payload === "tall") {
        return { ...item, size: action.payload, itemTotal: item.price + 500 };
      }
      if (action.payload === "grande") {
        return { ...item, size: action.payload, itemTotal: item.price + 1000 };
      }
      if (action.payload === "venti") {
        return { ...item, size: action.payload, itemTotal: item.price + 1500 };
      }
      return item;
    });
    return { ...state, modalItem: tempItem };
  }
  if (action.type === MODAL_QUANTITY) {
    let tempItem = state.modalItem.map((item) => {
      if (action.payload.addType === "amount") {
        if (action.payload.type === "inc") {
          return { ...item, amount: item.amount + 1 };
        }
        if (action.payload.type === "dec") {
          if (item.amount <= 1) {
            return { ...item, amount: 1 };
          }
          return { ...item, amount: item.amount - 1 };
        }
      }
      if (action.payload.addType === "shot") {
        if (action.payload.type === "inc") {
          return { ...item, shot: item.shot + 1 };
        }
        if (action.payload.type === "dec") {
          if (item.shot <= 0) {
            return { ...item, shot: 0 };
          }
          return { ...item, shot: item.shot - 1 };
        }
      }
      if (action.payload.addType === "icecream") {
        if (action.payload.type === "inc") {
          return { ...item, icecream: item.icecream + 1 };
        }
        if (action.payload.type === "dec") {
          if (item.icecream <= 1) {
            return { ...item, icecream: 0 };
          }
          return { ...item, icecream: item.icecream - 1 };
        }
      }
      return { ...item };
    });
    return { ...state, modalItem: tempItem };
  }
  if (action.type === MODAL_TOTAL_ITEM) {
    let tempItem = state.modalItem.map((item) => {
      return { ...item, order: action.payload };
    });
    return {
      ...state,
      count: action.payload,
      totalItem: [...state.totalItem, ...tempItem],
      modalItem: [],
      isModalOpen: false,
    };
  }
  /* */
  /* addItem추가아이템 위치  */
  if (action.type === ADDITEM_AMOUNT) {
    let tempItem = state.totalItem.map((item) => {
      if (action.payload.order === item.order) {
        if (action.payload.type === "inc") {
          return { ...item, amount: item.amount + 1 };
        }
        if (action.payload.type === "dec") {
          if (item.amount <= 1) {
            return { ...item, amount: 1 };
          }
          return { ...item, amount: item.amount - 1 };
        }
      }
      return item;
    });
    return { ...state, totalItem: tempItem };
  }
  if (action.type === ADDITEM_REMOVE) {
    let tempItem = state.totalItem
      .filter((item) => item.order !== action.payload)
      .map((item) => {
        if (item.order > action.payload) {
          return { ...item, order: item.order - 1 };
        }
        return { ...item };
      });
    return { ...state, totalItem: tempItem, count: state.count - 1 };
  }
  /*마지막 확인 절차*/
  if (action.type === FINAL_ITEMS_ORDER) {
    return { ...state, isOrderOpen: true };
  }
  if (action.type === ORDER_LIST_REMOVE) {
    return { ...state, isOrderOpen: false };
  }
  if (action.type === ORDER_COMPLETED) {
    if (state.totalItem.length === 0) {
      return { ...state, isOrderCompleted: false, isOrderOpen: false };
    } else {
      return {
        ...state,
        isOrderCompleted: true,
        isOrderOpen: false,
        todayOrder: action.payload,
        count: 0,
      };
    }
  }

  if (action.type === ORDER_SUCCESS) {
    return { ...state, isOrderCompleted: false, totalItem: [] };
  }
  /* 아이템 전체 금액*/
  if (action.type === TOTAL_ITEMS_PAYMENT) {
    let { total } = state.totalItem.reduce(
      (prev, cur) => {
        const { amount, shot, icecream, itemTotal, size } = cur;
        if (!size) {
          prev.total += itemTotal * amount;
        } else {
          prev.total +=
            itemTotal * amount + shot * 500 * amount + icecream * 500 * amount;
        }

        return prev;
      },
      { total: 0 }
    );
    return { ...state, total };
  }

  return state;
};

export default reducer;
