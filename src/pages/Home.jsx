import React from 'react';
import '../styles/Home.css';
import { Link, Element } from 'react-scroll';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

function Home() {
  return (
    <div className="App">
      <nav>
        <Link to="about" spy={true} smooth={true} duration={500}>About</Link>
        <Link to="portfolio" spy={true} smooth={true} duration={500}>Portfolio</Link>
        <Link to="contact" spy={true} smooth={true} duration={500}>Contact</Link>
      </nav>
      
      <div className="content">
        <Element name="about">
          <About />
        </Element>
        <Element name="portfolio">
          <Portfolio />
        </Element>
        <Element name="contact">
          <Contact />
        </Element>
      </div>
    </div>
  );
}

export default Home;
