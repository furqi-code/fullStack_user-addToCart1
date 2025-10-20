import React_dom from "react-dom/client";
import { App } from "./App";
// import { store } from "./store/redux";

const root = React_dom.createRoot(document.querySelector("#root"));
// root.render(<Provider store={store}><App /></Provider>);

root.render(<App />);
