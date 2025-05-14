
import useScrollAnimation from '../hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Frontend" },
  { name: "JavaScript", level: 92, category: "Frontend" },
  { name: "HTML & CSS", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },
  
  // Backend
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Express", level: 85, category: "Backend" },
  { name: "MongoDB", level: 82, category: "Backend" },
  
  // DevOps & Tools
  { name: "AWS", level: 85, category: "Tools" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "Testing", level: 80, category: "Tools" },
  { name: "VScode", level: 80, category: "Tools" },
];

const categories = ["Frontend", "Backend", "Tools"];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref}
      className={cn(
        "mb-6",
        isVisible ? 'animate-fade-in' : 'opacity-0'
      )}
      style={{ animationDelay: `${150 + (index * 50)}ms` }}
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill.name}</span>
        <span className="text-portfolio-gray text-sm">{skill.level}%</span>
      </div>
      <div className="h-2 bg-portfolio-dark/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-portfolio-teal rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${200 + (index * 50)}ms`
          }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="skills" className="bg-gradient-to-b from-portfolio-dark to-portfolio-dark/95" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`section-heading ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            My Skills
          </h2>
          <p className={`section-subheading mx-auto ${isVisible ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
            Technologies and tools I work with
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {categories.map((category) => (
            <div 
              key={category}
              className={cn(
                "card",
                isVisible ? 'animate-fade-in' : 'opacity-0'
              )}
              style={{ animationDelay: categories.indexOf(category) * 100 + 'ms' }}
            >
              <h3 className="text-xl font-bold mb-6 text-portfolio-teal">
                {category}
              </h3>
              
              <div>
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
