import React_dom from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./store/redux";

const root = React_dom.createRoot(document.querySelector("#root"));
root.render(<Provider store={store}><App /></Provider>);

