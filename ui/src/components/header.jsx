import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

export function Header() {
  const isLoggedin = useSelector((state) => state.isLoggedin);  
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userDetail");
    dispatch({
      type: "activeUser",
      status: false,
    });
    dispatch({
      type: "getWishlist",
      wishlist: [],   // array empty krde
    });
    navigate("/");
  };

  useEffect(() => {
    // after login header re-render nhi ho rha, reload krna pd rha
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
  }, []);
  // isLoggedin state HomeDesign and other sibling components me bhi use ho rha tha & i cant share the state there
  // so i had to lift the state Up and stored it in redux

  let totalCartItem = 0;
  wishlist.forEach((item) => {
    totalCartItem += item.quantity;
  });
  return (
    <nav className="bg-white shadow-lg mb-7 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-slate-800">Amazon</div>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/Sports"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Sports
            </Link>
            <Link
              to="/Electronics"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Electronics
            </Link>
            <Link
              to="/General"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              General
            </Link>
            {isLoggedin && (
              <button
                className="text-gray-700 hover:text-slate-800 transition-colors cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            )}
            {!isLoggedin && (
              <Link
                to="/addItem"
                className="text-gray-700 hover:text-slate-800 transition-colors"
              >
                Add Item
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {/* <button className="text-gray-700 hover:text-slate-800 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button> */}
            <Link
              to="/cartItems"
              className="myBtn text-gray-700 hover:text-slate-800 transition-colors relative"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROdEYJWy438DWyVWOnvbw1Aydy8-VNEbQ_B592E3Pste2GYBetOTs142mx9-QOEBZ3dQc&usqp=CAU"
                alt="cart"
                className="h-10"
              />
              <span
                className={`absolute -top-2 -right-2 text-gray text-xs rounded-full h-5 w-5 flex items-center justify-center ${
                  wishlist.length && "bg-blue-200"
                }`}
              >
                {wishlist.length === 0 ? "" : totalCartItem}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
