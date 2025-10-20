import { createStore } from "redux";

function storeReducer(
  state = { cart: [], isAuth: false, userId: null },
  action
) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

export const store = createStore(storeReducer);
