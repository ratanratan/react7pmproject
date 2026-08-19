import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {

    let {register,handleSubmit,reset} = useForm();

    let navigate = useNavigate(); 

    let loginLogics = (loginData) =>{
        //Get the register Details from local storage 
        const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

        //This login Data matching with any Register details 
         const validUser = registeredUsers.find(user =>
                user.email === loginData.email &&
                user.password === loginData.password
        );

        //If the login Successfull then navigate to veg Items 
            if(validUser)
            {   
                localStorage.setItem("loggedInUser", JSON.stringify(validUser));
                
                // alert('Login Sucessfull')
                navigate("/home");
                
                // Refresh page
                window.location.reload();
            }
            else{
                alert("login Fail Please wake up check code")
            }

    }

  return (
    <>
        <h1>Login Page......</h1>
      <form onSubmit={handleSubmit(loginLogics)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <br /><br />

        If you are not registered yet, please <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>

        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login; 