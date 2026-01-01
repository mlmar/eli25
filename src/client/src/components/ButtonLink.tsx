import { styles } from '@/styles';
import { css } from '@/util/css';
import { Link } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

type ButtonLinkProps = PropsWithChildren & {
    path: string | null | undefined;
    loading: boolean;
};

export function ButtonLink({ path, children, loading }: ButtonLinkProps) {
    return (
        <Link to={'/' + path} disabled={!path}>
            <button
                className={css(
                    `cursor-pointer pl-2 pr-2 hover:${styles.altTextColor} text-select-none disabled:cursor-default disabled:opacity-20`,
                    {
                        'opacity-20': loading
                    }
                )}
                disabled={!path}
                title={path ?? ''}
            >
                {children}
            </button>
        </Link>
    );
}
