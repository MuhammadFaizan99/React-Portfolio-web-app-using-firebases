import { useState } from "react";
import "./Testimonial.css";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../PortfolioFirebase";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AllReviews from "./AllReviews/AllReviews";

const db = getFirestore(app);

const Testimonial = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const putClientReviews = async () => {
    try {
      const dbRef = await addDoc(
        collection(db, `clientsOrders/${loc.state.clientId}/clientReview`),
        {
          rating: rating,
          reviewText: reviewText,
        }
      );
      console.log(dbRef.id);
      alert("Thank for your fedback");
      navigate("/", { state: { reviewID: dbRef.id } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Handle review submission here, e.g., send the data to the server or perform any desired action
    console.log(`Rating: ${rating}, Review Text: ${reviewText}`);

    // Call the putClientReviews function here
    putClientReviews();

    // Reset the state after submission
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="review-container">
      <h2 className="review-heading">Write Your Review</h2>
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={star <= rating ? "star selected" : "star"}
            onClick={() => handleStarClick(star)}
          >
            &#9733;
          </i>
        ))}
      </div>
      <textarea
        className="review-input"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review..."
        required
      />
      <button className="submit-button" onClick={handleSubmitReview}>
        Submit Review
      </button>
      <Routes></Routes>
      <button
        className="all-review-button"
        onClick={() => navigate("/testimonial/allReviews")}
      >
        See All Review
      </button>
    </div>
  );
};

export default Testimonial;
