import { css } from '@/util/css';

type IconLink = {
    className?: string;
    url: string;
    src: string;
};

export function IconLink({ className, url, src, ...rest }: IconLink) {
    return (
        <a href={url} className={css('flex h-5 w-5', className)} {...rest}>
            <img className='flex object-cover bg-transparent w-full h-full' src={src} alt={url + ' Image'} />
        </a>
    );
}
