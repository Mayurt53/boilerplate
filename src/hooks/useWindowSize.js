import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

const useWindowSize = (debounceMs = 100) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const debouncedWindowSize = useDebounce(windowSize, debounceMs);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return debouncedWindowSize;
};

export default useWindowSize; 