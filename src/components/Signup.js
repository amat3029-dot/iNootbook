import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),  
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //stores the token 
            localStorage.setItem('token', json.authToken);
            props.showAlert("Account created successfully","success")
            //navigate to the page means if correct credentials then it is turns to the note page 
            navigate("/login");

        }
        else {
        props.showAlert("invalid details","danger")
        }
    };
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className="container">
            <h2>Sign up for iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="name" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} minLength={5} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Conform Password</label>
                    <input type="password" className="form-control" name="cpassword" minLength={5} onChange={onChange} id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
