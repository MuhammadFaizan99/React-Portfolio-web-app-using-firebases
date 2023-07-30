import React, { useState } from "react";
import "./ModalContent.css";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../../../PortfolioFirebase";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);

const ModalContent = ({ closeModal }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    projectTitle: "",
    projectDescription: "",
    rating: 5, // Set the default rating to 5 stars
  });

  const putProjectsDetails = async () => {
    try {
      const {
        name,
        email,
        phoneNumber,
        projectTitle,
        projectDescription,
        rating,
      } = formData;

      if (
        !name ||
        !email ||
        !phoneNumber ||
        !projectTitle ||
        !projectDescription
      ) {
        alert("Please fill in all fields");
        return;
      }

      const dbRef = await addDoc(collection(db, "clientsOrders"), {
        name,
        email,
        phoneNumber,
        projectTitle,
        projectDescription,
        rating,
      });

      // Store the client ID in localStorage for every client who gives an order
      const storedReviewIds =
        JSON.parse(localStorage.getItem("reviewIds")) || [];
      storedReviewIds.push(dbRef.id);

      // Store the review ID only if the rating is 5 stars
      if (rating === 5) {
        const storedFiveStarReviewIds =
          JSON.parse(localStorage.getItem("fiveStarReviewIds")) || [];
        storedFiveStarReviewIds.push(dbRef.id);
        localStorage.setItem(
          "fiveStarReviewIds",
          JSON.stringify(storedFiveStarReviewIds)
        );
      }

      localStorage.setItem("reviewIds", JSON.stringify(storedReviewIds));

      alert("Your details are submitted successfully");
      navigate("/testimonial", { state: { clientId: dbRef.id } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send the data to the server or perform any desired action
    console.log(formData);

    // Call the function to add the project details to the database
    await putProjectsDetails();

    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      projectTitle: "",
      projectDescription: "",
      rating: 5, // Reset the rating to 5 stars after submission
    });

    // closeModal(); // Remove this line to keep the modal open after submission
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <h2>What project are you looking for?</h2>
          <span className="modal-close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your Phone Number"
            required
          />
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            placeholder="Project Title"
            required
          />
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Project Description"
            required
          />
        </div>
        <div className="modal-footer">
          <button type="button" className="modal-button" onClick={closeModal}>
            Close
          </button>
          <button type="submit" className="modal-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
