// components/AnimatedSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
}
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
    return (
         <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`${className} mt-4`}
        >
          {children}
         </motion.section>
      );
    };

export default AnimatedSection;