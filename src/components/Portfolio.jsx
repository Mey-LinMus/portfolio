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
            <section className="portfolio-item-content">
              <h2>{item.itemTitle}</h2>
              <div className="image-wrapper">
                <img
                  src={require(`../assets/Portfolio/${item.image}`)}
                  alt={`Item ${item.id}`}
                />
                <div className="hover-info">
                  <div className="hover-text">
                    <p>{item.description}</p>
                    <ul>
                      {item.technologies && (
                        <li key={index}>{item.technologies.join(" | ")}</li>
                      )}
                    </ul>
                  </div>
                  <button className="website-button">
                    {item.file && (
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-button"
                      >
                        Visit Website
                      </a>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Portfolio;
