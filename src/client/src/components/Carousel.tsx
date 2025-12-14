import { css } from '@/util/css';
import type { PropsWithChildren } from 'react';

type CarouselProps = PropsWithChildren & {
    className?: string;
};

export function Carousel({ className, children }: CarouselProps) {
    return <section className={css(...styles, className)}>{children}</section>;
}

const styles = [
    'carousel',
    'flex basis-full',
    'flex-wrap',
    // 'lg:flex-nowrap',
    // 'lg:overflow-x-auto',
    'overflow-y-auto',
    'h-full',
    'gap-20'
];
