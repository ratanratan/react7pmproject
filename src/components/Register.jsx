import React from "react";
import { useForm } from "react-hook-form";
import "../cssstyles/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register, handleSubmit, reset } = useForm();

  let navigate = useNavigate();
  const registerLogics = (userdata) => {

    // const response = await axios.post("http://localhost:8005/api/auth/register",userdata);

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(userdata);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful...");
    reset();
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="card register-card shadow-lg">
        <div className="card-body p-5">

          <h2 className="text-center text-primary mb-4">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(registerLogics)}>

            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter User Name"
                {...register("name", { required: true })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Mobile Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Mobile Number"
                {...register("mobile", { required: true })}
              />
            </div>

            <button className="btn btn-primary w-100 register-btn">
              Register
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Register;