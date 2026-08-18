import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaReceipt,
} from "react-icons/fa";

function Orders() {
  const orders = useSelector((globalState) => globalState.orders);

  // Store which orders are expanded
  const [expandedOrders, setExpandedOrders] = useState({});

  // Expand / Collapse order
  const toggleOrder = (index) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container py-5">

      {/* ================= PAGE HEADER ================= */}

      <div className="text-center mb-5">

        <h1 className="fw-bold text-primary">
          <FaReceipt className="me-2" />
          My Orders
        </h1>

        <p className="text-muted">
          View and manage your previous orders
        </p>

      </div>

      {/* ================= EMPTY ORDERS ================= */}

      {orders.length === 0 ? (

        <div
          className="card shadow-sm border-0 text-center p-5 mx-auto"
          style={{ maxWidth: "600px" }}
        >

          <FaBoxOpen
            size={80}
            className="text-secondary mb-4"
          />

          <h3 className="fw-bold text-danger">
            No Orders Found
          </h3>

          <p className="text-muted fs-5">
            You haven't placed any orders yet.
          </p>

        </div>

      ) : (

        /* ================= ORDERS ================= */

        <div className="row">

          {orders.map((order, index) => {

            const isExpanded = expandedOrders[index];

            // Calculate items total
            const itemsTotal = order.items.reduce(
              (total, item) =>
                total + item.price * item.quantity,
              0
            );

            // Total quantity
            const totalItems = order.items.reduce(
              (total, item) =>
                total + item.quantity,
              0
            );

            return (

              <div
                className="col-12 mb-4"
                key={index}
              >

                <div className="card border-0 shadow">

                  {/* =================================================
                              ORDER HEADER
                  ================================================= */}

                  <div className="card-header bg-white p-4">

                    <div className="row align-items-center">

                      {/* ORDER ID */}

                      <div className="col-md-4">

                        <small className="text-muted">
                          ORDER ID
                        </small>

                        <h5 className="fw-bold text-primary mb-1">
                          {order.OrderId}
                        </h5>

                        <small className="text-muted">
                          <FaCalendarAlt className="me-1" />
                          {order.date}
                        </small>

                      </div>

                      {/* ORDER STATUS */}

                      <div className="col-md-4 text-md-center mt-3 mt-md-0">

                        <span className="badge bg-success px-3 py-2">

                          <FaCheckCircle className="me-1" />

                          Order Placed

                        </span>

                      </div>

                      {/* EXPAND / COLLAPSE */}

                      <div className="col-md-4 text-md-end mt-3 mt-md-0">

                        <button
                          className="btn btn-outline-primary"
                          onClick={() => toggleOrder(index)}
                        >

                          {isExpanded ? (
                            <>
                              <FaChevronUp className="me-2" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <FaChevronDown className="me-2" />
                              View Details
                            </>
                          )}

                        </button>

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                         EXPANDABLE ORDER DETAILS
                  ================================================= */}

                  {isExpanded && (

                    <div className="card-body p-4">

                      <div className="row g-4">

                        {/* =================================================
                                  LEFT SIDE - ITEMS
                        ================================================= */}

                        <div className="col-lg-8">

                          <div className="card border-0 bg-light">

                            <div className="card-body">

                              <h5 className="fw-bold text-primary mb-4">

                                <FaBoxOpen className="me-2" />

                                Order Items

                              </h5>


                              {order.items.map(
                                (item, itemIndex) => (

                                  <div
                                    className="card mb-3 border-0 shadow-sm"
                                    key={itemIndex}
                                  >

                                    <div className="card-body">

                                      <div className="row align-items-center">

                                        {/* IMAGE */}

                                        <div className="col-3 col-md-2 text-center">

                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid rounded"
                                            style={{
                                              height: "80px",
                                              width: "80px",
                                              objectFit: "contain",
                                            }}
                                          />

                                        </div>


                                        {/* PRODUCT */}

                                        <div className="col-9 col-md-5">

                                          <h6 className="fw-bold mb-1">
                                            {item.name}
                                          </h6>

                                          <small className="text-muted">
                                            ₹{" "}
                                            {Number(
                                              item.price
                                            ).toFixed(2)}{" "}
                                            / item
                                          </small>

                                        </div>


                                        {/* QUANTITY */}

                                        <div className="col-6 col-md-2 mt-3 mt-md-0">

                                          <small className="text-muted">
                                            Quantity
                                          </small>

                                          <div className="fw-bold">
                                            {item.quantity}
                                          </div>

                                        </div>


                                        {/* ITEM TOTAL */}

                                        <div className="col-6 col-md-3 text-md-end mt-3 mt-md-0">

                                          <small className="text-muted">
                                            Total
                                          </small>

                                          <div className="fw-bold text-success">

                                            ₹{" "}
                                            {(
                                              item.price *
                                              item.quantity
                                            ).toFixed(2)}

                                          </div>

                                        </div>

                                      </div>

                                    </div>

                                  </div>

                                )
                              )}

                            </div>

                          </div>

                        </div>


                        {/* =================================================
                                  RIGHT SIDE - AMOUNT
                        ================================================= */}

                        <div className="col-lg-4">

                          <div className="card border-0 shadow-sm">

                            <div className="card-body">

                              <h5 className="fw-bold text-primary mb-4">
                                Amount Details
                              </h5>


                              {/* ITEMS TOTAL */}

                              <div className="d-flex justify-content-between mb-3">

                                <span>
                                  Items Total
                                </span>

                                <span className="fw-semibold">
                                  ₹{" "}
                                  {itemsTotal.toFixed(2)}
                                </span>

                              </div>


                              {/* TAX */}

                              <div className="d-flex justify-content-between mb-3">

                                <span>
                                  GST / Tax
                                </span>

                                <span className="fw-semibold">
                                  ₹{" "}
                                  {order.tax
                                    ? Number(
                                        order.tax
                                      ).toFixed(2)
                                    : "0.00"}
                                </span>

                              </div>


                              {/* DISCOUNT */}

                              <div className="d-flex justify-content-between mb-3 text-success">

                                <span>
                                  Discount
                                </span>

                                <span className="fw-semibold">

                                  - ₹{" "}
                                  {order.discount
                                    ? Number(
                                        order.discount
                                      ).toFixed(2)
                                    : "0.00"}

                                </span>

                              </div>


                              <hr />


                              {/* TOTAL ITEMS */}

                              <div className="d-flex justify-content-between mb-3">

                                <span>
                                  Total Items
                                </span>

                                <span className="fw-bold">
                                  {totalItems}
                                </span>

                              </div>


                              {/* FINAL AMOUNT */}

                              <div className="d-flex justify-content-between align-items-center">

                                <span className="fw-bold fs-5">
                                  Total Amount
                                </span>

                                <span className="fw-bold text-success fs-4">

                                  ₹{" "}
                                  {Number(
                                    order.totalPrice
                                  ).toFixed(2)}

                                </span>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  )}

                </div>

              </div>

            );
          })}
        </div>
      )}
    </div>
  );
}
export default Orders;