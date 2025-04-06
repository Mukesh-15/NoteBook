import React from "react";
import {Link,useLocation} from "react-router-dom";

export default function Navbar() {
  let location = useLocation();

  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <p className="navbar-brand" href="#">
        NoteBook
      </p>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${location.pathname==='/'?"active":""}`}>
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname==='/about'?"active":""}`}>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          
        </ul>
        <form className="d-flex">
          {
            (!localStorage.getItem("token"))?<>
            <Link className="btn btn-primary mr-3" to="/login" role="button">Login</Link>
            <Link className="btn btn-outline-primary" to="/Signup" role="button">Signup</Link>
            </>:<Link className="btn btn-outline-danger mr-3" to="/logout" role="button">Logout</Link>
          }
        </form>
      </div>
    </nav>
  );
}
