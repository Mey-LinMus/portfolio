import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "../styles/portfolio.css";
import { Link } from "react-router-dom";
import portfolioData from "../data/portfolioData.json";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import useInView

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

  const carouselSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "150px",
    slidesToShow: 3,
    speed: 500,
    prevArrow: (
      <motion.div
        className="slick-custom-arrow"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.5 }}
      >
        <AiOutlineCaretLeft />
      </motion.div>
    ),
    nextArrow: (
      <motion.div
        className="slick-custom-arrow"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.5 }}
      >
        <AiOutlineCaretRight />
      </motion.div>
    ),
  };

  // Define animation variants for the Portfolio section
  const portfolioVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1, // Adjust the animation duration
        ease: "easeInOut", // Adjust the easing function
      },
    },
  };

  return (
    <motion.div
      className="carousel-container"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={portfolioVariants}
    >
      <h2>Portfolio</h2>
      <div className="slider-wrapper">
        <Slider {...carouselSettings}>
          {portfolioData.map((item) => (
            <div className="carousel-item" key={item.id}>
              <Link to={`/portfolio/${item.id}`} className="port-items">
                <img
                  src={require(`../assets/Portfolio/${item.image}`)}
                  alt={`Item ${item.id}`}
                />
                <h3>{item.itemTitle}</h3>
                <ul>
                  {item.technologies &&
                    item.technologies.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                </ul>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default Portfolio;
