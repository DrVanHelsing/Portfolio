import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';
import { Code2, Server, Smartphone, Cloud, Database, Brain, Puzzle, BarChart3, MessageCircle, Users, Target } from 'lucide-react';
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
      <AnimatedBackground variant="particles" />
      
      <motion.div 
  className="skills-container"
     initial="hidden"
     animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="page-title" variants={categoryVariants}>
          Skills & Expertise
        </motion.h1>
        
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
          <span className="skill-name">{skill.name}</span>
     <span className="skill-level">{skill.level}%</span>
         </div>
   <div className="skill-bar">
      <motion.div 
    className="skill-progress"
   initial={{ width: 0 }}
 animate={{ width: `${skill.level}%` }}
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
 <h2>Additional Competencies</h2>
          <div className="competencies-grid">
            <div className="competency">
        <span className="competency-icon"><Puzzle size={20} /></span>
    <span>Problem-Solving</span>
    </div>
     <div className="competency">
              <span className="competency-icon"><BarChart3 size={20} /></span>
      <span>Analytical Thinking</span>
            </div>
            <div className="competency">
     <span className="competency-icon"><MessageCircle size={20} /></span>
              <span>Communication</span>
         </div>
    <div className="competency">
      <span className="competency-icon"><Users size={20} /></span>
    <span>Team Collaboration</span>
            </div>
            <div className="competency">
    <span className="competency-icon"><Smartphone size={20} /></span>
   <span>UI Development</span>
            </div>
       <div className="competency">
  <span className="competency-icon"><Target size={20} /></span>
          <span>Project Management</span>
            </div>
       </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
