import { useIsElementVisible } from '@/hooks/useIsElementVisible';
import { css } from '@/util/css';
import { cloneElement, isValidElement, Children, type PropsWithChildren, useRef } from 'react';

type CarouselProps = PropsWithChildren & {
    className?: string;
};

export function Carousel({ className, children }: CarouselProps) {
    return <section className={css(...styles, className)}>{children}</section>;
}

Carousel.Card = function CarouselCard({ children }: PropsWithChildren<{ className?: string }>) {
    const ref = useRef<HTMLElement | null>(null);
    const isElementVisible = useIsElementVisible(ref);

    return (
        <>
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, {
                        className: css((child.props as CarouselProps).className, {
                            invisible: isElementVisible
                        }),
                        ref: ref
                    } as React.Attributes);
                }
                return child;
            })}
        </>
    );
};

const styles = [
    'carousel',
    'grid',
    'lg:grid-cols-2',
    'col-span-3',
    'h-full',
    'gap-10',
    'lg:gap-20',
    'min-h-fit',
    '*:min-h-fit *:w-full'
];
