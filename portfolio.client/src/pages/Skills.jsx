import { motion } from 'framer-motion';
import SEO from '../components/utility/SEO';
import TechIconChip from '../components/ui/TechIconChip';
import { Code2, Server, Smartphone, Cloud, Database, Brain, Globe, Puzzle, BarChart3, MessageCircle, Users, Target, Lightbulb, Mic, HeartHandshake } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
{
    category: "Programming Languages",
      icon: <Code2 size={32} />,
      skills: [
        { name: "Python", level: 90 },
        { name: "Java", level: 75 },
   { name: "Matlab", level: 70 },
        { name: "C#", level: 80 }
      ]
    },
    {
category: "Web Development",
      icon: <Server size={32} />,
      skills: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "PHP", level: 80 },
        { name: "React", level: 75 }
      ]
    },
    {
      category: "Database",
      icon: <Database size={32} />,
      skills: [
     { name: "SQL", level: 85 },
   { name: "MySQL", level: 85 },
        { name: "Database Design", level: 80 },
      { name: "CRUD Operations", level: 85 }
      ]
    },
    {
      category: "Software Development",
      icon: <Smartphone size={32} />,
      skills: [
      { name: ".NET MAUI", level: 75 },
        { name: "C#", level: 80 },
        { name: "Git", level: 85 },
        { name: "GitHub", level: 85 },
        { name: "Agile/Scrum", level: 70 },
   { name: "Project Management", level: 65 }
      ]
    },
{
      category: "Microsoft Office",
      icon: <Cloud size={32} />,
      skills: [
  { name: "Word", level: 95 },
        { name: "Excel", level: 90 },
    { name: "PowerPoint", level: 90 }
      ]
    },
    {
      category: "Azure & Cloud",
      icon: <Globe size={32} />,
      skills: [
        { name: "Azure OpenAI", level: 75 },
        { name: "Azure Cognitive Services", level: 70 },
        { name: "Azure Speech", level: 70 },
        { name: "Azure SQL", level: 70 },
        { name: "Azure App Service", level: 65 },
        { name: "Application Insights", level: 65 },
        { name: "SignalR", level: 75 }
      ]
    },
    {
      category: "Machine Learning",
      icon: <Brain size={32} />,
      skills: [
        { name: "Neural Networks", level: 75 },
        { name: "Forward Propagation", level: 80 },
{ name: "Backpropagation", level: 75 },
 { name: "Multi-class Classification", level: 70 }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
   opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
      duration: 0.5
}
    }
  };

  return (
    <div className="skills-page">
      <SEO 
        title="Skills - Tredir Sewpaul"
        description="Explore my technical skills including frontend development, backend technologies, mobile development, cloud platforms, and DevOps tools."
        keywords="technical skills, react, javascript, .net, cloud computing, azure, devops, web development skills"
        path="/skills"
      />
      
      <motion.div 
  className="skills-container"
     initial="hidden"
     animate="visible"
        variants={containerVariants}
      >
        <div className="page-title-row">
          <motion.h1 className="page-title" variants={categoryVariants}>
            Skills & Expertise
          </motion.h1>
          <img
            src="/memojis/memoji-tada-pose.png"
            alt="Ta-da"
            className="memoji-page-float"
          />
        </div>
        
      <motion.p className="page-subtitle" variants={categoryVariants}>
     Technologies and tools I work with to build amazing solutions
     </motion.p>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
 <motion.div 
key={index}
      className="skill-category"
              variants={categoryVariants}
         >
       <div className="category-header">
              <span className="category-icon">{category.icon}</span>
    <h3 className="category-title">{category.category}</h3>
              </div>
 
         <div className="skills-list">
          {category.skills.map((skill, idx) => (
    <div key={idx} className="skill-item">
 <div className="skill-info">
          <TechIconChip name={skill.name} />
     <span className="skill-level">{skill.level}%</span>
         </div>
   <div className="skill-bar">
      <motion.div
    className="skill-progress"
   initial={{ width: 0 }}
 whileInView={{ width: `${skill.level}%` }}
 viewport={{ once: true }}
                 transition={{ duration: 1, delay: 0.2 * idx }}
        />
       </div>
        </div>
  ))}
     </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="additional-skills" variants={categoryVariants}>
          <h2>Soft Skills</h2>
          <div className="competencies-grid">
            {[
              { icon: <Puzzle size={22} />, label: 'Problem-Solving' },
              { icon: <BarChart3 size={22} />, label: 'Analytical Thinking' },
              { icon: <MessageCircle size={22} />, label: 'Communication' },
              { icon: <Users size={22} />, label: 'Team Collaboration' },
              { icon: <Lightbulb size={22} />, label: 'Adaptability' },
              { icon: <HeartHandshake size={22} />, label: 'Mentorship' },
              { icon: <Mic size={22} />, label: 'Public Speaking' },
              { icon: <Target size={22} />, label: 'Project Management' },
            ].map(({ icon, label }) => (
              <div className="competency" key={label}>
                <span className="competency-icon">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
