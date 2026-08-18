import React, { useRef, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { QRCode } from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";
import { addOrder } from "../redux/OrderSlice";
import { clearCart } from "../redux/CartSlice";

function CheckOut() {
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const addressRef = useRef();

  const location = useLocation();

  const {
    cart = [],
    grandTotal = 0,
    tax = 0,
    discount = 0,
    finalAmount = 0,
  } = location.state || {};

  let dispatch = useDispatch();

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const mobile = mobileRef.current.value;
    const address = addressRef.current.value;

    //Map the Template varaibles with our data.
    const templateParams = {
      order_id: "ORDER123",
      orders: cart.map((item) => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity,
      })),
      cost: {
        shipping: 50,
        tax: tax.toFixed(2),
        total: finalAmount.toFixed(2),
        platformfee: 10,
      },
      email: email,
    };

    emailjs
      .send(
        "service_cg9atjs",
        "template_240kp7n",
        templateParams,
        "KqS4enM6yf4hrGvkl",
      )
      .then(() => {
        alert("✅ Email sent successfully");
      })
      .catch((error) => {
        alert("❌ Email sending failed:", error);
      });

   let purchaseDetails = {
  OrderId: "ORDER" + Math.floor(100000 + Math.random() * 900000),
  date: new Date().toLocaleString(),
  items: [...cart],
  totalPrice: finalAmount.toFixed(2),
};

    // Dispatching to store to add the new order to the orders state in Redux
    dispatch(addOrder(purchaseDetails));

    // Clear the cart after placing the order
    dispatch(clearCart());

    //navigate the Cart 
    navigate("/orders");
  };

  let getCurrentAddress = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );

        addressRef.current.value = response.data.display_name;
      } catch (error) {
        console.log(error);
      }
    });
  };

  const [paymentMethod, setPaymentMethod] = useState("");

  const [payeeAddress, setPayeeAddress] = useState("gobiglobexzzz2@ybl");

  const payees = [
    {
      name: "Gopi Store",
      upiId: "gobiglobexzzz2@ybl",
    },
    {
      name: "Ratan Store - SBI",
      upiId: "9000160099@ybl",
    },
    {
      name: "Ratan Store - HDFC",
      upiId: "ratanstore@hdfcbank",
    },
  ];

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-success text-white text-center py-3 rounded-top-4">
              <h2 className="mb-0">Checkout Details</h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    ref={nameRef}
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="email"
                    ref={emailRef}
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Mobile Number</label>
                  <input
                    type="tel"
                    ref={mobileRef}
                    className="form-control form-control-lg"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Delivery Address</label>

                  <button
                    type="button"
                    className="btn btn-outline-primary mt-2"
                    onClick={getCurrentAddress}
                  >
                    📍 Use My Current Address
                  </button>

                  <textarea
                    rows={5}
                    cols={200}
                    ref={addressRef}
                    className="form-control"
                    placeholder="Enter your delivery address"
                    required
                  ></textarea>
                </div>

                <div className="payment-method">
                  <h3>💳 Select Payment Method:</h3>
                  <button onClick={() => setPaymentMethod("qr")}>
                    📱 QR Code
                  </button>
                  <button onClick={() => setPaymentMethod("card")}>
                    💳 Card
                  </button>
                </div>

                <select
                  className="form-select mb-3"
                  value={payeeAddress}
                  onChange={(e) => setPayeeAddress(e.target.value)}
                >
                  {payees.map((payee) => (
                    <option key={payee.upiId} value={payee.upiId}>
                      {payee.name} - {payee.upiId}
                    </option>
                  ))}
                </select>

                {paymentMethod === "qr" && (
                  <div className="qr-code-payment">
                    <h4>Scan the QR Code to Pay: ₹{finalAmount?.toFixed(2)}</h4>

                    <p>
                      Pay to: <strong>{payeeAddress}</strong>
                    </p>

                    <QRCode
                      value={
                        `upi://pay?pa=${payeeAddress}` +
                        `&pn=RatanStore` +
                        `&am=${finalAmount.toFixed(2)}` +
                        `&cu=INR`
                      }
                    />
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="qr-code-payment">
                    <h4>Enter the Card details:</h4>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Expiry Date (MM/YY)"
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="form-control mb-2"
                    />
                  </div>
                )}

                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
