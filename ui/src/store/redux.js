import { createStore } from "redux";

const initialState = {
  wishlist: [], // from DB to get user's wishlist
  isLoggedin: localStorage.getItem("userDetail") ? true : false,
};

function storeReducer(state = initialState, action) {
  switch (action.type) {
    case "activeUser":
      return {
        ...state,
        isLoggedin: action.status,
      };

    case "getWishlist":
      return {
        ...state,
        wishlist: action.wishlist,
      };
  }
  return state
}

export const store = createStore(storeReducer);

console.log(store.getState());