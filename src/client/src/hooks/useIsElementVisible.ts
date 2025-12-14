import { useEffect, useState } from "react";

/**
 * Returns true if element is on screen
 * @param {React.RefObject<HTMLElement>} ref 
 * @returns {boolean} 
 */
export function useIsElementVisible(ref: React.RefObject<HTMLElement | null>): boolean {
    const [isElementVisible, setIsElementVisible] = useState(true);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            setIsElementVisible(!entries[0].isIntersecting)
        }, {
            threshold: 0
        });

        const element = ref.current;
        if (element) {
            observer.observe(element);
        }

        return () => {
            observer.disconnect();
        }
    }, [ref]);

    return isElementVisible;
}