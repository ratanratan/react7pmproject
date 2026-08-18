import React from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Veg from "./components/Veg";
import NonVeg from "./components/NonVeg";
import Cart from "./components/Cart";
import { FaHome, FaLeaf } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { FcHome } from "react-icons/fc";
import { useSelector } from "react-redux";
import CheckOut from "./components/CheckOut";
import Register from "./components/Register";
import Login from "./components/Login";
import Orders from "./components/Orders";

function App() {

  //Get the Cart array form the Store 
  let cart = useSelector(globalState => globalState.cart);

  // Get logged in user
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  let logoutLogics = () => {
    // Remove logged in user
    localStorage.removeItem("loggedInUser");

    // Refresh page
    window.location.reload();
  }

  return (
    <BrowserRouter>

      <nav className="navbar">
        <NavLink to="/home"><FcHome className="nav-icon" /> Home</NavLink>
        <NavLink to="/veg"><FaLeaf className="nav-icon" /> Veg</NavLink>
        <NavLink to="/nonveg"><GiChickenOven className="nav-icon" /> NonVeg</NavLink>
        <NavLink to="/cart">🛒 Cart {cart.length}</NavLink>
         <NavLink to="/orders">Orders</NavLink>


       

        {
        user ? (
        <>
          <span>Welcome {user.name}</span>
          <NavLink onClick={logoutLogics}>Logout</NavLink>
        </>
        ) : (
          <>
        <NavLink to="/login">Login</NavLink>
        {/* <NavLink to="/register">Register</NavLink> */}
        </>
	  )
	}











      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;