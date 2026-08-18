import React from "react";
import "../styles/Veg.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";

function Veg() {
  const vegetables = [
    { id: 1, name: "Tomato", price: 30, image: "images/tomato.jpg", description: "Fresh red tomatoes rich in vitamins." },
    { id: 2, name: "Potato", price: 25, image: "images/potatos.jpg", description: "Organic potatoes perfect for curries and fries." },
    { id: 3, name: "Carrot", price: 40, image: "images/carrot.jpg", description: "Crunchy carrots loaded with Vitamin A." },
    { id: 4, name: "Cauliflower", price: 50, image: "images/califlower.jpg", description: "Fresh cauliflower ideal for healthy meals." },
    { id: 5, name: "Brinjal", price: 35, image: "images/brinjals.jpg", description: "Tender brinjals suitable for delicious curries." }
  ];

  let dispatch = useDispatch(); 



  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />

      <div className="container py-4">
        <h1 className="text-center text-success fw-bold mb-5">
          🥬 Fresh Vegetable Store
        </h1>

        <div className="row g-4">
          {vegetables.map((vegetable) => (
            <div key={vegetable.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card h-100 shadow-lg border-0 rounded-4">

                <img
                  src={vegetable.image}
                  className="card-img-top p-3"
                  alt={vegetable.name}
                  style={{ height: "220px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">

                  <h4 className="card-title text-success fw-bold">
                    {vegetable.name}
                  </h4>

                  <h5 className="text-danger fw-bold">
                    ₹{vegetable.price}/Kg
                  </h5>

                  <p className="card-text text-secondary">
                    {vegetable.description}
                  </p>

                  <button
                    className="btn btn-success mt-auto w-100 rounded-pill fw-bold"
                    onClick={() =>{
                      toast.success(`${vegetable.name} Added Successfully 🛒`);
                      dispatch(addToCart(vegetable));
                    }
                  }
                  >
                    🛒 Add To Cart
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Veg;