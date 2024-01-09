import "./registerstyle.css";
import React, { useState } from "react";
import axios from 'axios'
export default function App() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    /* event.persist(); NO LONGER USED IN v.17*/
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };
  const [serverResponse, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.firstName && values.lastName && values.email) {
      setValid(true);
      const res = await axios.post("http://localhost:4000/register", { name: values.firstName +" "+ values.lastName, password: values.password, email: values.email });
    console.log(res);

    if (res.status == 201) {
        setResponse("User Already Exists, Please Login")
    }else if (res.status == 200) {
        setResponse("Registered Successfully, Please Login")
    }
    setTimeout(function() {
        window.location.href = '/'; // Replace '/' with the desired route
    }, 3000);
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="success-message">
            <h3>
              {" "}
              Welcome {values.firstName} {values.lastName}{" "}
            </h3>
            <div> {serverResponse} </div>
          </div>
        )}
        {!valid && (
          <input
            class="form-field registerinput"
            
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.firstName && (
          <span id="first-name-error">Please enter a first name</span>
        )}

        {!valid && (
          <input
            className="form-field registerinput"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.lastName && (
          <span className="registerspan" id="last-name-error">Please enter a last name</span>
        )}

        {!valid && (
          <input
            className="form-field registerinput"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email && (
          <span id="email-error">Please enter an email address</span>
        )}

        {!valid && (
          <input
            className="form-field registerinput"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.password && (
          <span id="password-error">Please enter an password</span>
        )}

        {!valid && (
          <button className="form-field registerbutton" type="submit">
            Register
          </button>
        )}
      </form>
    </div>
  );
}
