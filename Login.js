import "./registerstyle.css";
import React, { useState } from "react";
import axios from 'axios'
export default function App() {
    const [values, setValues] = useState({
        name: "",
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
        if (values.email && values.password) {
            setValid(true);
            const res = await axios.post("http://localhost:4000/validate", { password: values.password, email: values.email });
            console.log(res);

            if (res.status == 200) {
                if (res.data.length > 0) {

                    setResponse("Logged In")
                    setValues((values) => ({
                        ...values,
                        ["name"]: res.data.name,
                    }));

                    localStorage.setItem('userName', res.data[0].name);
                    localStorage.setItem('authorId', res.data[0].author_id);

                } else {
                    setResponse("User Does not exist, please register")
                }
            } else if (res.status == 201) {

                // setValues((values) => ({
                //     ...values,
                //     [name]: res.data.name,
                //   }));
            }
            setTimeout(function () {
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
                            Welcome {values.name}{" "}
                        </h3>
                        <div> {serverResponse} </div>
                    </div>
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
