
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    // Smooth scroll implementation for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      });
    });

    // Add smooth scrolling to the whole page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check if the resume file exists
    const checkResumeFile = async () => {
      try {
        const response = await fetch('/resume.pdf');
        if (!response.ok) {
          console.warn('Resume file not found. Make sure to add a resume.pdf file to the public directory.');
          // Only show toast in development environment
          if (import.meta.env.DEV) {
            toast.warning('Resume file not found. Add a resume.pdf file to the public directory for the download functionality to work.');
          }
        }
      } catch (error) {
        console.warn('Failed to check resume file:', error);
      }
    };
    
    checkResumeFile();
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-dark text-portfolio-light">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      
      <footer className="py-6 bg-portfolio-dark/80 border-t border-portfolio-gray/10">
        <div className="container mx-auto text-center">
          <p className="text-portfolio-gray text-sm">
            © {new Date().getFullYear()} Sanket Debnath. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
