import React, { useEffect, useState } from "react";
import "./HeaderContent.css";

export default function HeaderContent() {
  const [typedText, setTypedText] = useState("");
  const targetText = "MUHAMMAD FAIZAN";
  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;

    const typeText = () => {
      if (currentIndex <= targetText.length) {
        setTypedText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    };

    typingInterval = setInterval(typeText, 200); // Adjust typing speed here (milliseconds)

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  const handleDownloadCV = () => {
    // Replace 'path/to/muhammad_faizan_cv.pdf' with the actual path to your CV file
    const cvFilePath = "../../CV[Muhammad Faizan].pdf";
    const link = document.createElement("a");
    link.href = cvFilePath;
    link.download = "muhammad_faizan_cv.pdf"; // You can set the desired filename for the downloaded CV
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="header-content">
      <div className="left__header-content">
        <h1>HI, I'M </h1>
        <span
          style={{ color: "#f9004d", fontSize: "30px", fontWeight: "bold" }}
        >
          {typedText}
        </span>
        <p>
          Computer Engineer || Web Developer
          <br /> & Design Enthusiast
        </p>
        <div className="right__navbar-content btn__header-content">
          <button onClick={handleDownloadCV}>
            <i className="fas fa-download"></i>Download CV
          </button>
        </div>
      </div>
      <div className="right__header-content">
        <img src="../../Pictures/main.png" alt="Error" />
      </div>
    </div>
  );
}
