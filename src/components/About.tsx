
import { FileText } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const About = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const handleDownloadResume = () => {
    // Create a link to the resume PDF and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sanket_Debnath_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-40 left-20 w-72 h-72 bg-portfolio-teal rounded-full filter blur-[120px] opacity-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`section-heading ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            About Me
          </h2>
          <p className={`section-subheading mx-auto ${sectionVisible ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
            Get to know my background, skills and passion for creating innovative solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            ref={imageRef}
            className={`relative ${imageVisible ? 'animate-fade-in-right' : 'opacity-0'}`}
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl border-2 border-portfolio-teal/20">
              <img 
                src="/lovable-uploads/f49696cb-8419-4f4e-917d-ddd3da74dc5c.png"
                alt="Sanket Debnath"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-portfolio-coral/30 rounded-lg -z-10"></div>
          </div>
          
          <div 
            ref={contentRef}
            className={`space-y-6 ${contentVisible ? 'animate-fade-in-left' : 'opacity-0'}`}
          >
            <h3 className="text-2xl font-bold text-portfolio-light">
              Full Stack Developer & Cloud Solutions Architect
            </h3>
            
            <p className="text-portfolio-gray">
              Hello! I'm Sanket Debnath, a passionate Full Stack Developer with expertise in building
              scalable web applications and cloud-native solutions.
            </p>
            
            <p className="text-portfolio-gray">
              I have Pursuing a Bachelor's degree in Computer Science and Engineering from University Institute of Technology Burdwan University. My journey in technology
              has equipped me with a strong foundation in software engineering principles and modern development practices.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <span className="text-portfolio-teal">▹</span>
                <span>React & Next.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-portfolio-teal">▹</span>
                <span>Node.js & Express</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-portfolio-teal">▹</span>
                <span>JavaScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-portfolio-teal">▹</span>
                <span>AWS & Azure</span>
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={handleDownloadResume} 
                className="btn-secondary flex items-center justify-center sm:justify-start gap-2 max-w-xs"
              >
                <FileText size={18} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
