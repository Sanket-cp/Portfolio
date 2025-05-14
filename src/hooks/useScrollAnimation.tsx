
import { useEffect, useState, useRef } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  animationDelay?: number;
}

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  animationDelay = 0
}: UseScrollAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply animation after the specified delay
          if (animationDelay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, animationDelay);
          } else {
            setIsVisible(true);
          }
          
          // If once is true, unobserve after becoming visible
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          // If once is false, elements can become invisible again when scrolled away
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once, animationDelay]);

  return { ref, isVisible };
}

export default useScrollAnimation;
