import React, { useRef, useState, useEffect } from "react";
import ScrollTrigger from "react-scroll-trigger";
import Header from "../components/Header";
import Portfolio from "../components/Portfolio";
import Skills from "../components/Skills";
import Languages from "../components/Languages";
import Footer from "../components/Footer";
import { motion, useAnimation } from "framer-motion";
import "../styles/Home.css";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const footerRef = useRef(null);
  const headerRef = useRef(null);
  const portfolioRef = useRef(null);
  const location = useLocation();

  const handleScrollEnter = (triggerId) => {
    console.log(`Element with trigger ID ${triggerId} entered the viewport.`);
  };

  const handleScrollExit = (triggerId) => {
    console.log(`Element with trigger ID ${triggerId} exited the viewport.`);
  };

  const [showBackToTop, setShowBackToTop] = useState(false);
  const controls = useAnimation();

  // const scrollToFooter = () => {
  //   if (footerRef.current) {
  //     footerRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const scrollToHeader = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => {
    if (portfolioRef.current) {
      portfolioRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buttonVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  useEffect(() => {
    if (showBackToTop) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [showBackToTop, controls]);

  useEffect(() => {
    if (location.state && location.state.scrollToPortfolio) {
      scrollToPortfolio();
    } else {
      scrollToHeader();
    }
  }, [location.state]);

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

  const [languagesInViewRef, languagesInView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (languagesInViewRef.current) {
        const scrollDiff =
          window.scrollY - languagesInViewRef.current.offsetTop;
        const parallaxValue = scrollDiff * 0.2;

        languagesInViewRef.current.style.backgroundPositionY = `${parallaxValue}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [languagesInViewRef]);

  return (
    <div>
      <ScrollTrigger onEnter={handleScrollEnter} onExit={handleScrollExit}>
        <div ref={headerRef} className="Header">
          <Header />
        </div>
      </ScrollTrigger>

      <ScrollTrigger
        onEnter={handleScrollEnter}
        onExit={handleScrollExit}
        className="Skills"
      >
        <Skills />
      </ScrollTrigger>

      <ScrollTrigger
        onEnter={handleScrollEnter}
        onExit={handleScrollExit}
        className="languages-section Languages"
      >
        <div ref={languagesInViewRef} className="Languages">
          <Languages />
        </div>
      </ScrollTrigger>

      <ScrollTrigger
        onEnter={handleScrollEnter}
        onExit={handleScrollExit}
        className="Portfolio"
      >
        <div ref={portfolioRef}>
          <motion.div
            className="Portfolio"
            initial="hidden"
            animate={controls}
            variants={portfolioVariants}
          >
            <Portfolio />
          </motion.div>
        </div>
      </ScrollTrigger>

      <ScrollTrigger
        onEnter={handleScrollEnter}
        onExit={handleScrollExit}
        className="Footer"
      >
        <div ref={footerRef}>
          <Footer />
        </div>
      </ScrollTrigger>

      <div className="back-to-top-container">
        <motion.div
          className="back-to-top-button"
          style={{ display: showBackToTop ? "block" : "none" }}
          initial="hidden"
          animate={controls}
          variants={buttonVariants}
        >
          {/* Back to top button */}
          <motion.button
            onClick={scrollToHeader}
            whileHover={{ scale: 1.2, rotate: 0 }}
            whileTap={{ scale: 0.5 }}
          >
            &#129061;
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
