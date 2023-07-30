import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import "./SignUp.css";
import { app } from "../PortfolioFirebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export default function SignUp() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const targetText = "Register yourself at CodeTech";
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(targetText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === targetText.length) {
        clearInterval(interval);
      }
    }, 200); // Adjust typing speed here (milliseconds)
  }, []);
  const signUpUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(
          `Your are registered with ${userCredential["_tokenResponse"].email}`
        );
        localStorage.setItem("isUserSignedIn", "true");
        navigate("/SignIn");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signInUserWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((results) => {
        const credential = GoogleAuthProvider.credentialFromResult(results);
        const token = credential.accessToken;
        console.log("token", token);
        const users = results.user;
        console.log("users", users);
        localStorage.setItem("isUserSignedIn", "true");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div className="signup-form-content">
      <h1 style={{ color: "#f9004d", fontSize: "30px", fontWeight: "bold" }}>
        {typedText}
      </h1>
      <form action="" onSubmit={signUpUser}>
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
          <input type="submit" value="Create Account" />
        </div>
        <div className="or-container">
          <div className="or-line"></div>
          <div className="or-content">OR</div>
          <div className="or-line"></div>
        </div>
        <div></div>
      </form>
      <button className="googleSignIn" onClick={signInUserWithGoogle}>
        {" "}
        Sign In With Google
      </button>
    </div>
  );
}
