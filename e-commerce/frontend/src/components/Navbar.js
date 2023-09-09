import React, { useState } from "react";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/ContextReducer";

export default function Navbar() {
  
  let data = useCart()
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="#">
            Tomato
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link active" to="/myOrder">My Orders</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <div className="btn bg-white text-danger mx-1" onClick={() => {setCartView(true)}}>
                  My Cart{"   "}
                  <span class="badge rounded-pill bg-danger">{data.length}</span>
                </div>
                {cartView? <Modal onClose = {() => {setCartView(false)}}><Cart/></Modal>:null}
                <div
                  className="btn bg-white text-danger mx-1"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn bg-white text-danger mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-danger mx-1" to="/signup">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
