import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

/**
 * Hook to automatically scroll to hash targets when the page loads
 */
export const useScrollToHash = () => {
    const location = useLocation();

    useEffect(() => {
        // Check if there's a hash in the URL
        if (location.hash) {
            // Small delay to ensure the page has rendered
            const timer = setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [location.hash]);
};
