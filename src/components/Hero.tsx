
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-dark via-portfolio-dark to-black z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-portfolio-teal rounded-full filter blur-[100px] opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-portfolio-coral rounded-full filter blur-[100px] opacity-10 animate-float animation-delay-700"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center px-4">
          <p 
            className={`text-portfolio-teal font-medium mb-4 tracking-wider ${
              loaded ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
          >
            WELCOME TO MY PORTFOLIO
          </p>
          
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
              loaded ? 'animate-fade-in opacity-100 delay-100' : 'opacity-0'
            }`}
          >
            I'm <span className="text-portfolio-teal">Sanket Debnath</span>,<br /> 
            Mern Stack Developer
          </h1>
          
          <p 
            className={`text-xl text-portfolio-gray max-w-2xl mx-auto mb-12 ${
              loaded ? 'animate-fade-in opacity-100 delay-200' : 'opacity-0'
            }`}
          >
            Building innovative web applications and cloud solutions.
            Specializing in React, Node.js, and AWS architecture.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row justify-center gap-4 ${
              loaded ? 'animate-fade-in opacity-100 delay-300' : 'opacity-0'
            }`}
          >
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="#about" 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-portfolio-light hover:text-portfolio-teal transition-colors duration-300 flex flex-col items-center ${
          loaded ? 'animate-fade-in opacity-100 delay-700' : 'opacity-0'
        }`}
      >
        <span className="mb-2 text-sm">Scroll Down</span>
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
