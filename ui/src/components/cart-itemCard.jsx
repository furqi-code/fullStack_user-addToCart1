import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export function CartItem({ ...product }) {
  const isLoggedin = useSelector((state) => state.isLoggedin);  
  const dispatch = useDispatch();

  // after every operation get the fresh data from db
  const getWishList = () => {
    axios({
      method: "GET",
      url: "https://unidyllic-dryable-vincenzo.ngrok-free.dev/wishlist",
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

  const removefromCart = async (product_id) => {
    try {
      if (isLoggedin) {
        const addToCartResponse = await axios({
          method: "DELETE",
          url: "https://unidyllic-dryable-vincenzo.ngrok-free.dev/wishlist/eliminate",
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
        alert("Kindly Login to delete item in your cart");
      }
    } catch (err) {
      console.log(`couldnt delete this product from wishlist`, err);
    }
  };

  const increaseQnty = async (product_id) => {
    try {
      if (isLoggedin) {
        const addToCartResponse = await axios({
          method: "PATCH",
          url: "https://unidyllic-dryable-vincenzo.ngrok-free.dev/wishlist/increase",
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
      alert(err.response.data.message)
    }
  };

  const decreaseQnty = async (product_id) => {
    try {
      if (isLoggedin) {
        const addToCartResponse = await axios({
          method: "PATCH",
          url: "https://unidyllic-dryable-vincenzo.ngrok-free.dev/wishlist/decrease",
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

  let bill = product.quantity * (product.MRP - (product.discount / 100) * product.MRP);
  console.log(`Stock of ${product.name}: `, product.stock);

  return (
    <div className="flex justify-between gap-14 py-8">
      <div>
        <img src={product.img} alt={product.name} className="w-150 object-contain" />
      </div>
      <div>
        <p className="text-lg">{product.description}</p>
        <div className="flex justify-between items center">
          <p className="mt-1">Quantity : </p>
          <div class="quantity" style={{ width: "90px" }}>
            <button
              className="myBtn"
              onClick={async () => {
                await decreaseQnty(product.product_id);
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
            <label>{product.quantity}</label>
            <button
              className="myBtn"
              onClick={async () => {
                await increaseQnty(product.product_id);
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
        </div>
        <Stack className="mt-1">
          <Rating
            name="half-rating-read"
            defaultValue={(Math.random() * 5).toFixed(1)}
            precision={0.5}
            readOnly
            // size="small"
          />
        </Stack>
        <p className="mt-1">
          Name : <span className="ms-1">{product.name}</span>
        </p>
        <s className="mt-1">MRP : ${product.MRP.toFixed(2)}</s>
        <p className="mt-1">
          Discount :
          <span className="text-red-400 text-lg ms-2">
            -{product.discount}%
          </span>
        </p>
        <div className="flex justify-between items center">
          <p>
            Bill :
            <span className="text-green-500 text-xl ms-2">
              ${bill.toFixed(2)}
            </span>
          </p>
          <button className="myBtn" onClick={async () =>  await removefromCart(product.product_id)}>
            <img
              src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-silver-trash-bin-clipart-png-image_5947991.jpg"
              alt="Trash"
              className="h-10"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
