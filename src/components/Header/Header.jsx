import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ changeTheme, color }) {
  const [userSignIn, setUserSignIn] = useState(false);
  const navigate = useNavigate();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const isUserSignedIn = localStorage.getItem("isUserSignedIn") === "true";
    setUserSignIn(isUserSignedIn);
  }, []);

  const handleUser = () => {
    // If the user is signed in, show the confirmation dialog
    if (userSignIn) {
      const shouldLogout = window.confirm("Are you sure you want to logout?");
      if (shouldLogout) {
        localStorage.setItem("isUserSignedIn", "false");
        setUserSignIn(false);
      }
    } else {
      // If the user is not signed in, navigate to the sign-in page
      navigate("/SignIn");
    }
  };

  return (
    <>
      <div className="navbar-content">
        <div className="logo__navbar-content">
          <h3>
            <span>C</span>ode<span>T</span>ech
          </h3>
        </div>
        <div className={`navbar-menu-content ${isMenuOpen ? "show" : ""}`}>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/testimonial">Testimonial</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={`right__navbar-content ${
            isMenuOpen ? "show-right-navbar" : ""
          }`}
        >
          <button className="btn2__right__navbar-content" onClick={changeTheme}>
            {color ? (
              <i className="fas fa-moon"></i>
            ) : (
              <i className="fas fa-sun"></i>
            )}
          </button>
          {/* Display "Sign In" or "Logout" based on userSignIn state */}
          <button className="btn1__right__navbar-content" onClick={handleUser}>
            {userSignIn ? (
              <>
                <i className="fas fa-sign-out-alt"></i> Logout
              </>
            ) : (
              <>
                <i className="fas fa-user"></i> Sign In
              </>
            )}
          </button>
        </div>
        <div
          className={`hamburger-menu ${isMenuOpen ? "hamburger-open" : ""}`}
          onClick={handleMenuToggle}
        >
          <div className={`line ${isMenuOpen ? "line-open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "line-open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "line-open" : ""}`}></div>
        </div>
      </div>
    </>
  );
}
