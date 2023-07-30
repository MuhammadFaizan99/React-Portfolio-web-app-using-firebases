import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";
import { app } from "../PortfolioFirebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
export default function SignIn() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleToSignUp = () => {
    navigate("/SignUp");
  };
  useEffect(() => {
    const targetText = "Sign in to Continue";
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(targetText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === targetText.length) {
        clearInterval(interval);
      }
    }, 200); // Adjust typing speed here (milliseconds)
  }, []);
  const signInUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        alert(`Login successfull${user}`);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="signin-form-content">
      <h1 style={{ color: "#f9004d", fontSize: "30px", fontWeight: "bold" }}>
        {typedText}
      </h1>
      <form action="" onSubmit={signInUser}>
        <div>
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            name="myEmail"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="myPassword"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input type="submit" value="Login to continue" />
        </div>
        <p onClick={handleToSignUp}>New at DevelopingThrill?</p>
      </form>
    </div>
  );
}
