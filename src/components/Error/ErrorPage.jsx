import React from "react";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <i className="fas fa-sad-tear"></i>
      <button className="home-button" onClick={() => navigate("/")}>
        Go to the homepage
      </button>
    </div>
  );
};

export default ErrorPage;
