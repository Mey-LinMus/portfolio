import React, { useState, useEffect } from "react";
import InfoPortfolio from "../components/InfoPortfolio";
import portfolioData from "../data/portfolioData.json"; // Import your data
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/detailportfolio.css";
import { motion } from "framer-motion";

const Detailportfolio = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the selected item by id in your portfolioData
    const selectedItem = portfolioData.find((item) => item.id === parseInt(id));

    if (selectedItem) {
      setInfo(selectedItem.detail);
    }
  }, [id]);

  const goBackToPortfolio = () => {
    // Navigate back to the home page with a specific scroll position
    navigate("/", { state: { scrollToPortfolio: true } });
  };

  return (
    <div className="detail-container">
      {info && (
        <div className="detail-content">
          {/* Wrap InfoPortfolio in a container div */}
          <div className="info-portfolio-container">
            <InfoPortfolio info={info} /> {/* Render InfoPortfolio */}
          </div>
          <motion.button onClick={goBackToPortfolio} className="arrowBack  back-button-container"  whileHover={{ scale: 1.2 }}   whileTap={{ scale: 0.5 }}>
            <span>&#129060;</span> 
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Detailportfolio;
