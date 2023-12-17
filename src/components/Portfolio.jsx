import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "../styles/portfolio.css";
import portfolioData from "../data/portfolioData.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const controls = useAnimation();
  const sliderRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }

    const sections = gsap.utils.toArray(".portfolio-item");
    const scrollContainer = sliderRef.current;

    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainer,
        pin: true,
        scrub: 0.5, // Adjust the scrub value
        end: "+=100%", // Adjust the end value
        markers: true,
      },
    });
    sections.forEach((section) => {
      let text = section.querySelectorAll(".anim");

      if (text.length === 0) return;

      gsap.from(text, {
        y: -130,
        opacity: 0,
        duration: 2,
        ease: "elastic",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          containerAnimation: scrollTween,
          start: "left center",
          markers: true,
        },
      });
    });
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
      <div className="slider-wrapper" ref={sliderRef}>
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
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Portfolio;
