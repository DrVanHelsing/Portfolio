import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Phone, MapPin } from 'lucide-react';
import useNoScroll from '../hooks/useNoScroll';
import './Contact.css';

const Contact = () => {
  useNoScroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus('sending');
    
    try {
      // TODO: Replace with actual backend integration
      // Example: FormSpree, EmailJS, or Azure Functions
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    } catch (_error) {
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
   transition: {
        staggerChildren: 0.1
 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact - Tredir Sewpaul"
        description="Get in touch with me for collaboration, project inquiries, or professional opportunities. Let's build something amazing together."
        keywords="contact developer, hire developer, collaboration, project inquiry, get in touch"
        path="/contact"
      />
      <AnimatedBackground variant="particles" />
      
      <motion.div 
        className="contact-container"
   initial="hidden"
        animate="visible"
        variants={containerVariants}
    >
  <motion.h1 className="page-title" variants={itemVariants}>
          Get In Touch
      </motion.h1>
  
   <motion.p className="page-subtitle" variants={itemVariants}>
Let's discuss your next project or opportunity
        </motion.p>

      <div className="contact-content">
          <motion.div className="contact-info" variants={itemVariants}>
            <h2>Contact Information</h2>
            
            <div className="info-item">
    <div className="info-icon"><Mail size={24} /></div>
       <div className="info-text">
           <h4>Email</h4>
                <a href="mailto:tredirs@gmail.com">tredirs@gmail.com</a>
       </div>
 </div>

     <div className="info-item">
          <div className="info-icon"><Phone size={24} /></div>
        <div className="info-text">
    <h4>Phone</h4>
         <a href="tel:+27674082819">067-408-2819</a>
     </div>
          </div>

        <div className="info-item">
<div className="info-icon"><MapPin size={24} /></div>
              <div className="info-text">
           <h4>Location</h4>
         <p>Cape Town, South Africa</p>
        </div>
       </div>

            <div className="social-links">
         <h3>Connect With Me</h3>
    <div className="social-icons">
       <a href="https://github.com/DrVanHelsing" target="_blank" rel="noopener noreferrer" className="social-icon">
<svg viewBox="0 0 24 24" fill="currentColor">
     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
        </a>
           <a href="https://linkedin.com/in/tredir-sewpaul" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
             </a>
              </div>
         </div>

            <div className="availability">
       <div className="status-indicator"></div>
            <span>Available for opportunities</span>
  </div>
          </motion.div>

          <motion.form 
   className="contact-form" 
         onSubmit={handleSubmit}
     variants={itemVariants}
 >
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <label htmlFor="name">
                <User size={18} />
                Name
              </label>
   <input
      type="text"
       id="name"
     name="name"
        value={formData.name}
         onChange={handleChange}
          placeholder="Your name"
      />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

       <div className={`form-group ${errors.email ? 'error' : ''}`}>
       <label htmlFor="email">
         <Mail size={18} />
         Email
       </label>
           <input
                type="email"
     id="email"
             name="email"
           value={formData.email}
       onChange={handleChange}
          placeholder="your.email@example.com"
     />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.subject ? 'error' : ''}`}>
              <label htmlFor="subject">
                <MessageSquare size={18} />
                Subject
              </label>
       <input
        type="text"
      id="subject"
     name="subject"
    value={formData.subject}
 onChange={handleChange}
     placeholder="What's this about?"
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>

         <div className={`form-group ${errors.message ? 'error' : ''}`}>
       <label htmlFor="message">
         <MessageSquare size={18} />
         Message
       </label>
  <textarea
  id="message"
                name="message"
 value={formData.message}
    onChange={handleChange}
    rows="6"
                placeholder="Tell me about your project..."
      ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

            <button 
              type="submit" 
     className="submit-button"
            disabled={isSubmitting}
      >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

    {formStatus === 'success' && (
            <div className="form-message success">
              <CheckCircle size={20} />
              Message sent successfully! I'll get back to you soon.
       </div>
            )}
            
            {formStatus === 'error' && (
              <div className="form-message error">
                <AlertCircle size={20} />
                Failed to send message. Please try again or email me directly.
              </div>
            )}
      </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
