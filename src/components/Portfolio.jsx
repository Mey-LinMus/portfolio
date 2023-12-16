// Portfolio.js

import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "../styles/portfolio.css";
import portfolioData from "../data/portfolioData.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const portfolioVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="portfolio-container"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={portfolioVariants}
    >
      <div className="slider-wrapper">
        {portfolioData.map((item, index) => (
          <div
            className={`portfolio-item ${index % 2 === 0 ? "even" : "odd"}`}
            key={item.id}
          >
            <div className="portfolio-item-content">
              <h3>{item.itemTitle}</h3>
              <div className="image-wrapper">
                <img
                  src={require(`../assets/Portfolio/${item.image}`)}
                  alt={`Item ${item.id}`}
                />
                <div className="hover-info">
                  <p>{item.description}</p>
                  <ul>
                    {item.technologies &&
                      item.technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Portfolio;
