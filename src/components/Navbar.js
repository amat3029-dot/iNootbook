import React, { useEffect } from 'react';
import { Link,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();  

  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);


  const handlelogout=()=>{
    localStorage.removeItem('token');
     navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">iNotebook</Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`} 
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} 
                to="/about"
              >
                About
              </Link>
            </li>

          </ul>

        {!localStorage.getItem('token')?<form className="d-flex">
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/signup" role="button">signup</Link>
          </form>:<button type="button" class="btn btn-primary" onClick={handlelogout}>Logout</button>}

        </div>
      </div>
    </nav>
  );
}