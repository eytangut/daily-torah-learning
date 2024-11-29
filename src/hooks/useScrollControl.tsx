import { useState, useEffect } from 'react';

const useScrollControl = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percentage = (scrolled / scrollHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', updateScrollPercentage);
    return () => window.removeEventListener('scroll', updateScrollPercentage);
  }, []);

  const setScrollPosition = (percentage: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = (percentage / 100) * scrollHeight;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  return [scrollPercentage, setScrollPosition];
};

export default useScrollControl;