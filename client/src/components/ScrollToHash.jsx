import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToElement = (targetHash) => {
      const id = targetHash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // handle initial load or URL changes
    if (hash) {
      scrollToElement(hash);
    } else if (!hash && pathname) {
      window.scrollTo(0, 0);
    }

    // handle repeated clicks on the same hash link
    const handleHashClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.hash && link.pathname === window.location.pathname) {
        // delay to allow the router to update
        setTimeout(() => scrollToElement(link.hash), 0);
      }
    };

    window.addEventListener('click', handleHashClick);
    return () => window.removeEventListener('click', handleHashClick);
  }, [pathname, hash]);

  return null;
}
