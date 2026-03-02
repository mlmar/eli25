import { useIsElementVisible } from '@/hooks/useIsElementVisible';
import { styles } from '@/styles';
import { css } from '@/util/css';
import { AnimatePresence, motion } from 'motion/react';
import { cloneElement, isValidElement, Children, type PropsWithChildren, useRef } from 'react';

type CarouselProps = PropsWithChildren & {
    className?: string;
    position: number;
    direction: number;
    onSwipe?: (direction: number) => void;
};

export function Carousel({ className, children, position, direction, onSwipe }: CarouselProps) {
    return (
        <section role='region' aria-label='Articles list' className={css(...carouselStyles, className)}>
            <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                <motion.div
                    className='flex h-full w-full'
                    custom={direction}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    drag='x'
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(_e, { offset, velocity }) => {
                        if (onSwipe) {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -swipeConfidenceThreshold) {
                                onSwipe(1); // left
                            } else if (swipe > swipeConfidenceThreshold) {
                                onSwipe(-1); // right
                            }
                        }
                    }}
                    transition={{
                        x: { type: 'spring', stiffness: 250, damping: 35, mass: 1 }
                    }}
                    key={position}
                >
                    {Children.toArray(children).at(position)}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

const carouselStyles = ['carousel', 'relative', 'overflow-hidden', styles.cardShadow];
const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000
    }),
    center: {
        zIndex: 1,
        x: 0
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000
    })
};
const swipeConfidenceThreshold = 1000;

Carousel.Card = function CarouselCard({ children }: PropsWithChildren<{ className?: string }>) {
    const ref = useRef<HTMLElement | null>(null);
    const isElementVisible = useIsElementVisible(ref);

    return (
        <>
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, {
                        className: css((child.props as CarouselProps).className, {
                            invisible: !isElementVisible
                        }),
                        ref: ref
                    } as React.Attributes);
                }
                return child;
            })}
        </>
    );
};
