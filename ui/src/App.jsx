import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from "./components/homepage";
import { CategoryComponent } from "./components/categoryComponent";
import { ItemInput } from "./components/inputForm";
import { NotFound } from "./components/NotFound";
import { ShowBag } from "./components/showBag";
import { HomeDesign } from "./components/homeDesign";
import { OpenItem } from "./components/openProduct";
import axios from "axios";

async function AuthCheck() {
  try {
    // console.log(process.env);
    const res = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}/wishlist`,
      headers: {
        Authorization: localStorage.getItem("userDetail"),
        "ngrok-skip-browser-warning": true,
      },
    });
    if (res.data.length === 0) {
      throw redirect("/");
    }
  } catch (error) {
    throw redirect("/");
  }
}

const routes = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        Component: HomeDesign,
      },
      {
        path: "/addItem",
        Component: ItemInput,
      },
      {
        path: "/cartItems",
        Component: ShowBag,
        loader: AuthCheck,
      },
      {
        path: "/:categoryName",
        Component: CategoryComponent,
      },
      {
        path: "/:categoryName/:productId",
        Component: OpenItem,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}
