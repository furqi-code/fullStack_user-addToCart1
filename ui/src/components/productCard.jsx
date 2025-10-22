import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export function Card({ product_id, name, description, MRP, img }) {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const addedCartItem = wishlist.find((item) => {
    if (item.product_id === product_id) {
      return item;
    }
  });

  // after every operation get the fresh data from db
  const getWishList = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}/wishlist`,
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
  };

  const collectItems = async (product_id) => {
    try {
      if (isLoggedin) {
        const addToCartResponse = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_ENDPOINT}/wishlist`,
          headers: {
            Authorization: localStorage.getItem("userDetail"),
            "ngrok-skip-browser-warning": true,
          },
          params: {
            product_id,
          },
        });
        console.log("Product added in your Cart:", addToCartResponse.data);
        await getWishList();
      } else {
        alert("Kindly Login to add item in your cart");
      }
    } catch (err) {
      console.log(`couldnt insert this product in wishlist`, err);
    }
  };

  const increaseQnty = async (product_id) => {
    try {
      if (isLoggedin) {
        const addToCartResponse = await axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_API_ENDPOINT}/wishlist/increase`,
          headers: {
            Authorization: localStorage.getItem("userDetail"),
            "ngrok-skip-browser-warning": true,
          },
          params: {
            product_id,
          },
        });
        console.log(addToCartResponse.data);
        await getWishList();
      } else {
        alert("Kindly Login to increase item in your cart");
      }
    } catch (err) {
      console.log(`Error while increase Qnty`, err);
      alert(err.response.data.message);
    }
  };

  const decreaseQnty = async (product_id) => {
    try {
      if (isLoggedin) {
        const addToCartResponse = await axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_API_ENDPOINT}/wishlist/decrease`,
          headers: {
            Authorization: localStorage.getItem("userDetail"),
            "ngrok-skip-browser-warning": true,
          },
          params: {
            product_id,
          },
        });
        console.log(addToCartResponse.data);
        await getWishList();
      } else {
        alert("Kindly Login to decrease item in your cart");
      }
    } catch (err) {
      console.log(`couldnt decrease the quantity of this product`, err);
    }
  };

  return (
    <div class="card">
      <div class="card-img">
        <div class="">
          <img src={img} alt="" />
        </div>
      </div>
      <div class="card-title">{name}</div>
      <div class="card-subtitle">{description}</div>
      <hr class="card-divider" />
      <div class="card-footer">
        <div class="card-price">
          <span>$</span> {MRP.toFixed(2)}
        </div>
        {!addedCartItem ? (
          <button
            class="card-btn myBtn"
            onClick={async (e) => {
              e.preventDefault(); // Prevent Link navigation
              e.stopPropagation(); // Prevent parent handlers (if any)
              await collectItems(product_id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
              <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
              <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
              <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
            </svg>
          </button>
        ) : (
          <div
            class="quantity"
            style={{ width: "90px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="myBtn"
              onClick={async (e) => {
                e.preventDefault(); // Prevent Link navigation
                e.stopPropagation(); // Prevent parent handlers (if any)
                await decreaseQnty(product_id);
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
                  stroke="#47484b"
                  d="M20 12L4 12"
                ></path>
              </svg>
            </button>
            <label>{addedCartItem.quantity}</label>
            <button
              className="myBtn"
              onClick={async (e) => {
                e.preventDefault(); // Prevent Link navigation
                e.stopPropagation(); // Prevent parent handlers (if any)
                await increaseQnty(product_id);
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
                  stroke="#47484b"
                  d="M12 4V20M20 12H4"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
