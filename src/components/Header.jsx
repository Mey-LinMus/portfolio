import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect/dist/core";
import "../styles/header.css";
import profileImage from "../assets/profile-shadow.png";

const Header = () => {
  const flyInVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const animationVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const typewriterRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      const typewriter = new Typewriter(typewriterRef.current, {
        loop: false,
        delay: 45,
        cursor: "|",
      });

      typewriter
        .typeString("Hey, Ik ben <strong> Mey-Lin Mus.</strong>")
        .pauseFor(1000)
        .typeString(
          " Ik ben een gedreven student aan de Erasmushogeschool Brussel, waar ik de opleiding Multimedia & Creatieve Technologie volg. Ik ben gepassioneerd door de voortdurend veranderende geconnecteerde wereld.\n" +
            " Als enthousiast persoon sta ik altijd open voor het leren van nieuwe dingen. Als doorzetter geef ik niet snel op.\n" +
            "Ik werk nauwkeurig en met het nodige geduld. Bovendien werk ik graag in teamverband en ben ik goed in communiceren."
        )
        .start();
    }
  }, [inView]);

  return (
    <div>
      <motion.header
        initial="initial"
        animate="animate"
        variants={flyInVariants}
        className="header"
        style={{
          backgroundPositionY: `${scrollY * 0.5}px`, // Adjust the multiplier for desired parallax effect
        }}
      >
        <div className="header-content">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="text-balloon">
            <span ref={typewriterRef}></span>
          </div>
        </div>
        <div ref={ref} className="middle-content">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={animationVariants}
          ></motion.div>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
