import { useEffect } from 'react';

export const useScrollReveal = (selector = '.reveal', options = {}) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          if (options.once !== false) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: options.threshold || 0.15,
      rootMargin: options.rootMargin || '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, options]);
};
