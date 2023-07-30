import React from "react";
import HeaderContent from "./HeaderContent/HeaderContent";
import ServiceContent from "./ServiceContent/ServiceContent";
import ReviewsDisplay from "./ReviewsDisplay/ReviewsDisplay";

export default function HomeContent() {
  return (
    <div>
      <HeaderContent />
      <ServiceContent />
      <ReviewsDisplay />
    </div>
  );
}
