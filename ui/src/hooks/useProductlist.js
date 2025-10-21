import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export function useProductslist(initialState, category) {
  const [productList, setProductlist] = useState(initialState);
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.API_ENDPOINT}/products`,
      headers: {
        Authorization: localStorage.getItem("userDetail"),
        "ngrok-skip-browser-warning": true,
      },
      params: {
        category,
      },
    })
      .then((res) => {
        setProductlist(res.data);
      })
      .catch((err) => {
        console.log(`couldnt get products of ${category} page`, err);
      });
    if (isLoggedin) {
      axios({
        method: "GET",
        url: `${process.env.API_ENDPOINT}/wishlist`,
        headers: {
        Authorization: localStorage.getItem("userDetail"),
        "ngrok-skip-browser-warning": true,
      },
      })
        .then((getResponse) => {
          dispatch({
            type: "getWishlist",
            wishlist: getResponse.data,
          });
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
        });
    }
  }, [category]);

  return productList;
}
