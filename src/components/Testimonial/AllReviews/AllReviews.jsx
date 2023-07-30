import React, { useEffect, useState } from "react";
import "./AllReviews.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { app } from "../../PortfolioFirebase";

const db = getFirestore(app);

const AllReviews = () => {
  const [filterRating, setFilterRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const reviewIds = JSON.parse(localStorage.getItem("reviewIds")) || [];

  const handleFilterByRating = (rating) => {
    setFilterRating(rating);
  };

  const resetFilter = () => {
    setFilterRating(0);
  };

  const fetchReviewsAndRatings = async () => {
    try {
      setLoading(true);
      const reviewsData = [];
      for (const reviewId of reviewIds) {
        // Fetch the main order document
        const orderDocRef = doc(db, `clientsOrders/${reviewId}`);
        const orderDocSnapshot = await getDoc(orderDocRef);
        if (orderDocSnapshot.exists()) {
          const orderData = orderDocSnapshot.data();
          const orderReviewId = orderDocSnapshot.id;

          // Fetch the review subcollection for this order
          const reviewQuery = query(
            collection(db, `clientsOrders/${orderReviewId}/clientReview`)
          );
          const reviewQuerySnapshot = await getDocs(reviewQuery);

          // Extract the review data from the subcollection and add it to the reviewsData array
          reviewQuerySnapshot.forEach((reviewDoc) => {
            const reviewData = reviewDoc.data();
            reviewsData.push({
              name: orderData.name,
              rating: reviewData.rating,
              reviewText: reviewData.reviewText,
            });
          });
        }
      }

      // Filter the reviews based on the selected rating
      const filteredReviews =
        filterRating === 0
          ? reviewsData
          : reviewsData.filter((review) => review.rating === filterRating);
      setLoading(false);
      setReviews(filteredReviews);
    } catch (error) {
      console.log("Error fetching reviews and ratings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsAndRatings();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchReviewsAndRatings();
  }, [filterRating]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <i key={i} className="star-icon">
          &#9733;
        </i>
      );
    }
    return stars;
  };

  return (
    <div className="all-reviews-page">
      <h1 className="page-heading">All Client Reviews</h1>
      <div className="filter-container">
        <button
          className={
            filterRating === 0 ? "filter-button selected" : "filter-button"
          }
          onClick={resetFilter}
        >
          All Reviews
        </button>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={
              filterRating === star ? "filter-button selected" : "filter-button"
            }
            onClick={() => handleFilterByRating(star)}
          >
            {star} Star{star !== 1 && "s"}
          </button>
        ))}
      </div>
      <div className="reviews-wrapper">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="no-reviews-text">No user</p>
        ) : (
          <div className="reviews-container">
            {reviews.map((client, index) => (
              <div key={index} className="review-box">
                <h3 className="client-name">{client.name}</h3>
                <div className="rating-container">
                  {renderStars(client.rating)}
                </div>
                <p className="review-text">{client.reviewText}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
