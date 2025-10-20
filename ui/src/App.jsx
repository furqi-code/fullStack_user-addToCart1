import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from "./components/homepage";
import { CategoryComponent } from "./components/categoryComponent";
import { ItemInput } from "./components/inputForm";
import { NotFound } from "./components/NotFound";
import { ShowBag } from "./components/showBag";
import { HomeDesign } from "./components/homeDesign";
import { OpenItem } from "./components/openProduct";

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
