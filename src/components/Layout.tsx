// components/Layout.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "Educhain Demo" }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

     useEffect(() => {
    // Load theme from localStorage on mount
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
       setTheme(storedTheme || 'light')
    }, []);

    useEffect(() => {
        // Save theme to localStorage when it changes
        localStorage.setItem('theme', theme);
        if(theme == 'dark'){
             document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }

    }, [theme]);


  const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} relative min-h-screen bg-background-image`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Educhain Interactive Demo" />
      </Head>
        <nav className="relative p-4  dark:bg-dark-primary dark:border-b-2 dark:border-dark-accent flex justify-between items-center">
             <span className=" text-2xl font-bold dark:text-white" >Educhain</span>
            <button onClick={toggleTheme} className="dark:text-white bg-gray-200 dark:bg-dark-secondary px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-dark-accent transition-colors duration-200">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
        </nav>
      <main className="py-6 px-4 md:px-12 relative">
             <AnimatePresence>
                 <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}

                >
                    {children}
                </motion.div>
            </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;