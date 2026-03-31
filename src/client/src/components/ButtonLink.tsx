import { css } from '@/util/css';
import { Link } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

type ButtonLinkProps = PropsWithChildren & {
    className?: string;
    path: string | null | undefined;
    loading: boolean;
    search: Record<string, unknown>;
    disabled?: boolean;
};

export function ButtonLink({ className, path, children, loading, search, disabled }: ButtonLinkProps) {
    return (
        <Link className={css('flex', className)} to={'/' + path} search={search} disabled={!path}>
            <button
                className={css(
                    'cursor-pointer px-2 hover:text-alt text-select-none disabled:cursor-default disabled:opacity-20',
                    {
                        'opacity-20': loading
                    }
                )}
                disabled={!path || disabled}
                title={path ?? ''}
            >
                {children}
            </button>
        </Link>
    );
}
