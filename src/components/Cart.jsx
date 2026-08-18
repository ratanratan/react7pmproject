import { useDispatch, useSelector } from "react-redux";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaShoppingCart,
  FaTag,
} from "react-icons/fa";

import {
  clearCart,
  decCart,
  incCart,
  removeFromCart,
} from "../redux/CartSlice";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { applyCupon, resetCoupon } from "../redux/CuponSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);

  // Read Coupon state from Redux store
  const {
    code,
    discount,
    applied,
    message,
  } = useSelector((state) => state.cuponDetails);

  const [cupon, setCupon] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==================================================
  //                 BILL CALCULATIONS
  // ==================================================

  // Items Total
  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // GST 5%
  const tax = grandTotal * 0.05;

  // Normal Discount
  // 10% discount if Grand Total > ₹100
  const normaldiscount =
    grandTotal > 100 ? grandTotal * 0.1 : 0;

  // Coupon Discount
  const cuponAmount = (grandTotal * discount) / 100;

  // Final Amount
  const finalAmount =
    grandTotal +
    tax -
    normaldiscount -
    cuponAmount;

  return (
    <div className="container mt-5">

      {cart.length === 0 ? (

        // ==================================================
        //                  EMPTY CART
        // ==================================================

        <div className="d-flex justify-content-center align-items-center">

          <div
            className="card shadow-lg border-0 text-center p-5"
            style={{
              maxWidth: "600px",
              width: "100%",
            }}
          >

            {/* Cart Icon */}
            <div className="mb-4">
              <FaShoppingCart
                size={80}
                className="text-secondary"
              />
            </div>

            {/* Heading */}
            <h2 className="text-danger fw-bold">
              Your Cart is Empty!
            </h2>

            {/* Message */}
            <p className="text-muted fs-5 mt-3">
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <p className="text-secondary">
              Explore our products and add your
              favorite items to your shopping cart.
            </p>

            {/* Continue Shopping */}
            <button
              className="btn btn-success btn-lg mt-3 px-5"
              onClick={() => navigate("/")}
            >
              <FaShoppingCart className="me-2" />
              Continue Shopping
            </button>

          </div>

        </div>

      ) : (

        // ==================================================
        //                  CART WITH ITEMS
        // ==================================================

        <div className="row">

          {/* ==================================================
                              LEFT SIDE
              ================================================== */}

          <div className="col-lg-8">

            {/* Cart Heading + Clear Cart */}
            <div className="d-flex justify-content-between align-items-center mb-4">

              <h3 className="text-success">
                <FaShoppingCart className="me-2" />
                Shopping Cart
              </h3>

              <button
                className="btn btn-outline-danger"
                onClick={() => {dispatch(clearCart());
                              dispatch(resetCoupon())}}
              >
                <FaTrash className="me-2" />
                Clear Cart
              </button>

            </div>

            {/* Cart Products */}
            {cart.map((product) => (

              <div
                className="card mb-3 shadow-sm"
                key={product.id}
              >

                <div className="row g-0 align-items-center">

                  {/* Product Image */}
                  <div className="col-md-3 text-center p-3">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{
                        height: "130px",
                        objectFit: "contain",
                      }}
                    />

                  </div>

                  {/* Product Details */}
                  <div className="col-md-9">

                    <div className="card-body">

                      {/* Product Name */}
                      <h4 className="fw-bold">
                        {product.name}
                      </h4>

                      {/* Description */}
                      <p className="text-muted">
                        {product.description}
                      </p>

                      {/* Price */}
                      <h5 className="text-success">
                        ₹ {product.price}
                      </h5>

                      {/* Quantity Controls */}
                      <div className="d-flex align-items-center mt-3">

                        {/* Minus */}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            dispatch(decCart(product))
                          }
                        >
                          <FaMinus />
                        </button>

                        {/* Quantity */}
                        <span className="mx-3 fw-bold fs-5">
                          {product.quantity}
                        </span>

                        {/* Plus */}
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            dispatch(incCart(product))
                          }
                        >
                          <FaPlus />
                        </button>

                        {/* Remove */}
                        <button
                          className="btn btn-outline-danger ms-5"
                          onClick={() =>
                            dispatch(removeFromCart(product))
                          }
                        >
                          <FaTrash className="me-2" />
                          Remove
                        </button>

                      </div>

                      {/* Product Total */}
                      <h5 className="mt-3">

                        Total :

                        <span className="text-primary ms-2">

                          ₹{" "}

                          {(
                            product.price *
                            product.quantity
                          ).toFixed(2)}

                        </span>

                      </h5>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* ==================================================
                              RIGHT SIDE
              ================================================== */}

          <div className="col-lg-4">

            <div
              className="card shadow-lg sticky-top"
              style={{ top: "20px" }}
            >

              <div className="card-body">

                {/* ==================================================
                              BILL HEADING
                    ================================================== */}

                <h3 className="text-center text-primary mb-4">

                  <FaShoppingCart className="me-2" />

                  Bill Details

                </h3>


                {/* ==================================================
                              COUPON SECTION
                    ================================================== */}

                <div
                  className="p-3 mb-4"
                  style={{
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                    borderRadius: "12px",
                  }}
                >

                  {/* Coupon Heading */}

                  <div className="d-flex align-items-center mb-2">

                    <FaTag
                      className="text-success me-2"
                      size={20}
                    />

                    <div>

                      <h5 className="mb-0 fw-bold">
                        Apply Coupon
                      </h5>

                      <small className="text-muted">
                        Save more on your order
                      </small>

                    </div>

                  </div>


                  {/* Coupon Input */}

                  <div className="input-group mt-3">

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter coupon code"
                      value={cupon}
                      onChange={(e) =>
                        setCupon(
                          e.target.value.toUpperCase()
                        )
                      }
                    />

                    <button
                      className="btn btn-primary fw-bold px-3"
                      onClick={() =>
                        dispatch(applyCupon(cupon))
                      }
                    >
                      Apply
                    </button>

                  </div>


                  {/* Coupon Message */}

                  {message && (

                    <div
                      className={`mt-3 p-2 rounded ${
                        applied
                          ? "bg-success-subtle text-success"
                          : "bg-danger-subtle text-danger"
                      }`}
                    >

                      <strong>
                        {applied ? "✓ " : "✕ "}
                      </strong>

                      {message}

                    </div>

                  )}


                  {/* Applied Coupon Information */}

                  {applied && (

                    <div
                      className="mt-3 p-3"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px dashed #198754",
                        borderRadius: "10px",
                      }}
                    >

                      <div className="d-flex justify-content-between align-items-center">

                        <div>

                          <small className="text-muted d-block">
                            Applied Coupon
                          </small>

                          <strong className="text-success">
                            <FaTag className="me-1" />
                            {code}
                          </strong>

                        </div>


                        <div className="text-end">

                          <small className="text-muted d-block">
                            Coupon Discount
                          </small>

                          <strong className="text-success">
                            - ₹ {cuponAmount.toFixed(2)}
                          </strong>

                        </div>

                      </div>

                    </div>

                  )}

                </div>


                {/* ==================================================
                              ITEMS TOTAL
                    ================================================== */}

                <div className="d-flex justify-content-between mb-2">

                  <span>
                    Items Total
                  </span>

                  <span>
                    ₹ {grandTotal.toFixed(2)}
                  </span>

                </div>


                {/* ==================================================
                              GST
                    ================================================== */}

                <div className="d-flex justify-content-between mb-2">

                  <span>
                    GST (5%)
                  </span>

                  <span>
                    ₹ {tax.toFixed(2)}
                  </span>

                </div>


                {/* ==================================================
                              NORMAL DISCOUNT
                    ================================================== */}

                {normaldiscount > 0 && (

                  <div className="d-flex justify-content-between mb-2 text-success">

                    <span>
                      Normal Discount
                    </span>

                    <span>
                      - ₹ {normaldiscount.toFixed(2)}
                    </span>

                  </div>

                )}


                {/* ==================================================
                              COUPON DISCOUNT
                    ================================================== */}

                {applied && (

                  <div className="d-flex justify-content-between mb-2 text-success">

                    <span>
                      Coupon Discount ({discount}%)
                    </span>

                    <span>
                      - ₹ {cuponAmount.toFixed(2)}
                    </span>

                  </div>

                )}


                <hr />


                {/* ==================================================
                              FINAL AMOUNT
                    ================================================== */}

                <div className="d-flex justify-content-between align-items-center fw-bold fs-4">

                  <span>
                    Total Amount
                  </span>

                  <span className="text-success">

                    ₹ {finalAmount.toFixed(2)}

                  </span>

                </div>


                {/* ==================================================
                              CHECKOUT BUTTON
                    ================================================== */}

                <button
                  className="btn btn-success w-100 mt-4"
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        cart: cart,
                        grandTotal: grandTotal,
                        tax: tax,
                        normaldiscount: normaldiscount,
                        discount: discount,
                        cuponAmount: cuponAmount,
                        finalAmount: finalAmount,
                      },
                    })
                  }
                >

                  Proceed to Checkout

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;