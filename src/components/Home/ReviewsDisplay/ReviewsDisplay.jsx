import { useEffect, useState } from "react";
import "./ReviewsDisplay.css";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore();

const ReviewsDisplay = () => {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Retrieve the dbRef.id array from localStorage
    const storedReviewIds = JSON.parse(localStorage.getItem("reviewIds")) || [];

    const fetchData = async () => {
      try {
        const fetchedReviews = [];

        // Fetch reviews and ratings for each reviewId in the storedReviewIds array
        for (const reviewId of storedReviewIds) {
          const reviewRef = collection(
            db,
            `clientsOrders/${reviewId}/clientReview`
          );
          const reviewSnapshot = await getDocs(reviewRef);
          if (!reviewSnapshot.empty) {
            // Fetch the client name from the main collection
            const orderRef = collection(db, "clientsOrders");
            const orderSnapshot = await getDocs(orderRef);
            orderSnapshot.docs.forEach((orderDoc) => {
              const orderData = orderDoc.data();
              if (orderDoc.id === reviewId && orderData.name) {
                const clientName = orderData.name;
                // Add the review data along with the client name to the fetchedReviews array
                reviewSnapshot.docs.forEach((reviewDoc) => {
                  const reviewData = reviewDoc.data();
                  if (reviewData.rating === 5) {
                    fetchedReviews.push({
                      name: clientName,
                      rating: reviewData.rating,
                      reviewText: reviewData.reviewText,
                    });
                  }
                });
              }
            });
          }
        }

        // Sort the reviews by date (assuming there's a date field in the review data)
        fetchedReviews.sort((a, b) => a.date - b.date);

        // Select the first 7 reviews
        const first7FiveStarReviews = fetchedReviews.slice(0, 7);

        // Update the state with the selected reviews
        setReviews(first7FiveStarReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="carousel-container">
        <div className="loading-container">Loading...</div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <h1 className="carousel-heading">
        <i className="fas fa-comment"></i> Client's Feedback
      </h1>
      <div className="carousel">
        {activeIndex !== 0 && (
          <i
            className="fa fa-chevron-left prev-icon"
            onClick={handlePrevious}
          ></i>
        )}
        <div className="review">
          <div className="user"> {reviews[activeIndex]?.name}</div>
          <div className="rating">
            {Array.from(
              { length: reviews[activeIndex]?.rating || 0 },
              (_, index) => (
                <i key={index} className="fa fa-star"></i>
              )
            )}
          </div>
          <p
            style={{ fontFamily: "'Poppins', sans-serif", color: "#6b7280" }}
            className="review-text"
          >
            {reviews[activeIndex]?.reviewText}
          </p>
        </div>
        {activeIndex !== reviews.length - 1 && (
          <i className="fa fa-chevron-right next-icon" onClick={handleNext}></i>
        )}
      </div>
      <div className="dots-container">
        {reviews.map((review, index) => (
          <span
            key={index}
            className={`dot ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ReviewsDisplay;
