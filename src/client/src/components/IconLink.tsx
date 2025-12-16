import { css } from '@/util/css';

type IconLink = {
    className?: string;
    url: string;
    src: string;
    ariaLabel?: string;
};

export function IconLink({ className, url, src, ariaLabel, ...rest }: IconLink) {
    const label = ariaLabel ?? `Open ${url}`;
    return (
        <a
            href={url}
            className={css(
                'flex h-5 w-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500',
                className
            )}
            aria-label={label}
            target='_blank'
            rel='noopener noreferrer'
            {...rest}
        >
            <img className='flex object-cover bg-transparent w-full h-full' src={src} alt='' aria-hidden='true' />
        </a>
    );
}
