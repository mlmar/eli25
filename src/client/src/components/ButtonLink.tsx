import { styles } from '@/styles';
import { Link } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

type ButtonLinkProps = PropsWithChildren & {
    path: string | null | undefined;
};

export function ButtonLink({ path, children }: ButtonLinkProps) {
    return (
        <Link to={'/' + path} disabled={!path}>
            <button
                className={`cursor-pointer pl-2 pr-2 hover:${styles.altTextColor} text-select-none disabled:opacity-40 disabled:cursor-default `}
                disabled={!path}
            >
                {children}
            </button>
        </Link>
    );
}
