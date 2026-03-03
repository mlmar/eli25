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
        <section className={css(...carouselStyles, className)}>
            <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                <motion.div
                    key={position}
                    custom={direction}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    drag='x'
                    dragMomentum={false}
                    dragElastic={0.1}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_e, { offset, velocity }) => {
                        const swipe = offset.x;
                        if (Math.abs(swipe) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
                            onSwipe?.(swipe > 0 ? -1 : 1);
                        }
                    }}
                    transition={{
                        x: { type: 'spring', stiffness: 250, damping: 35 }
                    }}
                >
                    {Children.toArray(children).at(position)}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

const carouselStyles = ['carousel relative overflow-hidden will-change-transform', styles.cardShadow];
const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%'
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%'
    })
};
const swipeThreshold = 50;
const velocityThreshold = 500;

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
