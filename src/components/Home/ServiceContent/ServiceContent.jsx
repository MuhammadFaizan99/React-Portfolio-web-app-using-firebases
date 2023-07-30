import React, { useState } from "react";
import ModalContent from "./ModalContent/ModalContent";
import "./ServiceContent.css";

const ServiceContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="services-content">
      <h1 className="services-heading">
        <i className="fas fa-cogs"></i> My Services
      </h1>
      <div className="primary__services-content">
        <div className="secondary-service" onClick={handleModalOpen}>
          <i className="fas fa-code"></i>
          <h3>Optimized Web Apps</h3>
          <p>Elevating MERN Apps. Maximizing Results.</p>
          <button>Buy Service</button>
        </div>
        <div className="secondary-service" onClick={handleModalOpen}>
          <i className="fas fa-wrench"></i>
          <h3>Website Maintenance</h3>
          <p>Sustaining Websites. Ensuring Excellence.</p>
          <button>Buy Service</button>
        </div>
        <div className="secondary-service" onClick={handleModalOpen}>
          <i className="fas fa-shopping-cart"></i>
          <h3>E-Commerce Solutions</h3>
          <p>Empower Commerce. Elevate Sales.</p>
          <button>Buy Service</button>
        </div>
      </div>
      <div className="primary__services-content">
        <div className="secondary-service" onClick={handleModalOpen}>
          <i className="fas fa-chart-line"></i>
          <h3>Data Insights</h3>
          <p>Data Unveiled. Insights Unlocked.</p>
          <button>Buy Service</button>
        </div>
        <div className="secondary-service" onClick={handleModalOpen}>
          <i className="fas fa-robot"></i>
          <h3>Machine Learning</h3>
          <p>AI-Driven Future. Smart Solutions Today.</p>
          <button>Buy Service</button>
        </div>
        <div className="secondary-service" onClick={handleModalOpen}>
          <i className="fas fa-lightbulb"></i>
          <h3>Smart Data Solutions</h3>
          <p>Data-Powered Decisions. Smarter Outcomes.</p>
          <button>Buy Service</button>
        </div>
      </div>

      {isModalOpen && <ModalContent closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ServiceContent;
