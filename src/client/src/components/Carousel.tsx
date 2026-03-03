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
    // Inside your Carousel component
    const allChildren = Children.toArray(children);

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
                    className='relative flex h-full w-full shrink-0 items-center justify-center'
                >
                    <div className='w-full h-full absolute right-full'>{allChildren[position - 1]}</div>
                    <div className='w-full h-full'>{allChildren[position]}</div>
                    <div className='w-full h-full absolute left-full'>{allChildren[position + 1]}</div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

const carouselStyles = ['carousel relative overflow-hidden', styles.cardShadow];
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
