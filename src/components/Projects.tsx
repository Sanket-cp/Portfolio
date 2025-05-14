import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveLink: string;
  githubLink: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Social Connect App",
    description: "A full-featured social media platform with real-time messaging, profile customization, and content sharing. Built with React, Node.js, and WebSockets for seamless communication.",
    tags: ["React", "Node.js", "MongoDB", "WebSockets"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://ephemeral-mu.vercel.app/",
    githubLink: "https://github.com/Sanket-cp/ephemeral"
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description: "A simple weather application that provides real-time forecasts, location-based weather data, and interactive maps. Uses OpenWeather API and Leaflet for mapping.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://weather-app-woad-omega-35.vercel.app/",
    githubLink: "https://github.com/Sanket-cp/Weather-App"
  },
  {
    id: 3,
    title: "Task Manager",
    description: "A minimalist task management application featuring drag-and-drop interfaces, priority labeling, and deadline reminders. Includes local storage for offline usage.",
    tags: ["React", "Redux", "Local Storage", "Drag-and-Drop"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://task-forage.vercel.app/",
    githubLink: "https://github.com/Sanket-cp/TaskForage"
  },
  
  {
    id: 4,
    title: "E-commerce Platform",
    description: "A complete e-commerce solution with product listings, shopping cart, secure checkout, and order management. Integrated with payment gateways and shipping APIs.",
    tags: ["React", "Node.js", "MongoDB", "Stripe API"],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://sleek-shop-six.vercel.app/",
    githubLink: "https://github.com/Sanket-cp/sleek-shop"
  },
  {
    id: 5,
    title: "Health Assistant",
    description: "An AI Health Assistant offering personalized medical guidance, emergency support, nearby doctor and pharmacy finder, ambulance access, and insurance assistance—all in one smart platform.",
    tags: ["React Js", "Stripe API", "Express.js", "Health API"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://health-assistant-phi.vercel.app/",
    githubLink: "https://github.com/Sanket-cp/HEALTH-ASSISTANT"
  },
  {
    id: 6,
    title: "E-Learning Platfrom",
    description: "An educational platform offering engaging courses, real-time collaboration, and personalized learning experiences for students and professionals.",
    tags: ["React.js", "Node.js", "MongoDb", "Express.js"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://eduscape-iota.vercel.app/",
    githubLink: "https://github.com/Sanket-cp/Eduscape"
  },
  
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref}
      className={cn(
        "card group hover:transform hover:-translate-y-2",
        isVisible ? 'animate-fade-in' : 'opacity-0'
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="h-48 rounded-md mb-4 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-portfolio-light group-hover:text-portfolio-teal transition-colors duration-300">
        {project.title}
      </h3>
      
      <p className="text-portfolio-gray mb-4">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span 
            key={tag} 
            className="text-xs bg-portfolio-teal/10 text-portfolio-teal px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <a
          href={project.liveLink}
          className="text-portfolio-light hover:text-portfolio-teal flex items-center gap-1 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={16} />
          <span>Live Demo</span>
        </a>
        
        <a
          href={project.githubLink}
          className="text-portfolio-light hover:text-portfolio-teal flex items-center gap-1 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} />
          <span>Code</span>
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectsPerPage = 4;
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = showAllProjects 
    ? projects 
    : projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast.success(`Showing page ${page} of projects`);
  };

  const handleViewAllProjects = () => {
    setShowAllProjects(!showAllProjects);
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast.success(showAllProjects ? "Showing paginated projects" : "Showing all projects");
  };
  
  return (
    <section id="projects" className="relative" ref={ref}>
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-portfolio-coral rounded-full filter blur-[100px] opacity-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`section-heading ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            My Projects
          </h2>
          <p className={`section-subheading mx-auto ${isVisible ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
            Explore my recent work and the projects I've built
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {currentProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12 space-x-4">
          <Button 
            onClick={handleViewAllProjects} 
            variant="secondary" 
            className={`${isVisible ? 'animate-fade-in delay-500' : 'opacity-0'}`}
          >
            {showAllProjects ? "Show Fewer Projects" : "View All Projects"}
          </Button>
        </div>
        
        {!showAllProjects && totalPages > 1 && (
          <div className={`mt-12 ${isVisible ? 'animate-fade-in delay-500' : 'opacity-0'}`}>
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
