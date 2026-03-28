import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
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
            props.showAlert("successfully logged in","success")
            //navigate to the page means if correct credentials then it is turns to the note page 
            navigate("/");

        }
        else {
           props.showAlert("invalid credentials","danger")
        }
    };
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className="mt-3">
            <h2>Access your notes from iNotebook</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                         value={credentials.email}  
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                         value={credentials.password}  
                        onChange={onChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
