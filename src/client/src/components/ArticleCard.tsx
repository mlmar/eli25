import { styles } from '@/styles';
import type { Article } from '@/types/Article';
import { css } from '@/util/css';
import { isMobile, shareText } from '@/util/share';
import { Copy, Share } from 'feather-icons-react';
import { useId, useState } from 'react';

type ArticleCardProps = Article & {
    className?: string;
    placeholder?: boolean;
};

export function ArticleCard({ className, article, summary, placeholder = false, ...rest }: ArticleCardProps) {
    const id = useId();
    const headingId = `article-title-${id}`;
    const hasUrl = Boolean(article?.url);
    const hasImage = Boolean(article?.urlToImage);

    const [toast, setToast] = useState<string | null>(null);

    function renderImage() {
        return !hasImage ? (
            <div role='img' aria-label='No image available' className='self-center w-full text-center'>
                No Image Available
            </div>
        ) : (
            <img
                className='flex object-cover bg-black text-white w-full h-full'
                src={article?.urlToImage}
                alt={article?.title ?? 'Article image'}
                loading='lazy'
            />
        );
    }

    function renderSource() {
        return (
            Boolean(article?.source?.name) && (
                <a
                    className={css(
                        'hover:underline',
                        'focus:outline-none',
                        'focus-visible:ring-2',
                        'focus-visible:ring-offset-2',
                        'focus-visible:ring-indigo-500',
                        'font-semibold',
                        'text-sm',
                        'mr-2',
                        styles.altTextColor
                    )}
                    href={article?.url ?? undefined}
                    aria-label={`Source: ${article?.source?.name}`}
                    target={hasUrl ? '_blank' : undefined}
                    rel={hasUrl ? 'noopener noreferrer' : undefined}
                >
                    {`@${article?.source?.name}`}
                </a>
            )
        );
    }

    function renderShareButton() {
        const iconClassName = `h-[1.2em] hover:stroke-indigo-600`;
        const mobile = isMobile();
        return (
            Boolean(article?.url) && (
                <button
                    className='cursor-pointer relative'
                    aria-label='Share'
                    title='Share'
                    onClick={() => {
                        shareText(article?.url);
                        if (!mobile) {
                            setToast('Copied to clipboard');
                            setTimeout(() => setToast(null), 1000);
                        }
                    }}
                >
                    {mobile && <Share className={iconClassName} />}
                    {!mobile && (
                        <>
                            <Copy className={iconClassName} />
                            {!!toast && (
                                <span
                                    className={css(
                                        'toast',
                                        'absolute top-0 right-[100%]',
                                        'text-nowrap text-sm font-semibold',
                                        'px-2',
                                        styles.cardBg,
                                        styles.altTextColor
                                    )}
                                >
                                    {toast}
                                </span>
                            )}
                        </>
                    )}
                </button>
            )
        );
    }

    return (
        <article
            aria-labelledby={headingId}
            className={css(
                'flex flex-col overflow-hidden h-full',
                styles.cardBg,
                styles.cardShadow,
                styles.cardRadius,
                className,
                {
                    placeholder: placeholder
                }
            )}
            {...rest}
        >
            {placeholder && (
                <div
                    className='flex basis-50 cursor-default basis-full h-full bg-indigo-500 min-h-60'
                    aria-hidden='true'
                ></div>
            )}
            {!placeholder &&
                (hasUrl ? (
                    <a
                        href={article?.url}
                        className={css(
                            'flex',
                            'basis-50',
                            'cursor-pointer',
                            'basis-full',
                            'bg-neutral-900',
                            'text-white',
                            'focus:outline-none',
                            'focus-visible:ring-2',
                            'focus-visible:ring-offset-2',
                            'focus-visible:ring-indigo-500',
                            'max-h-[20em]'
                        )}
                        aria-label={`Open article: ${article?.title ?? 'Article'}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <figure className='w-full h-full object-cover'>
                            {renderImage()}
                            <figcaption className='sr-only'>Article image for {article?.title}</figcaption>
                        </figure>
                    </a>
                ) : (
                    <div
                        className='flex basis-50 cursor-default basis-full h-full bg-neutral-900 text-white'
                        aria-hidden='true'
                    >
                        {renderImage()}
                    </div>
                ))}
            {placeholder && <div className='flex flex-col basis-full p-5 gap-3 min-h-40' aria-hidden='true'></div>}
            {!placeholder && (
                <aside className='flex flex-col basis-full p-5 gap-3 min-h-fit'>
                    <h2 id={headingId}>
                        {hasUrl ? (
                            <a
                                className='font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500'
                                href={article?.url}
                                aria-label={`Open article: ${article?.title ?? 'Article'}`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {article?.title}
                            </a>
                        ) : (
                            <span className='font-semibold'>{article?.title}</span>
                        )}
                    </h2>
                    <ul className='h-full list-disc pl-5 text-[.9em]'>
                        {summary
                            ?.trim()
                            .split(delimiter)
                            .map((text, i) => {
                                return Boolean(text.trim()) && <li key={text + '_' + i}> {text} </li>;
                            })}
                    </ul>
                    <footer className='flex justify-between'>
                        {renderSource()}
                        {renderShareButton()}
                    </footer>
                </aside>
            )}
        </article>
    );
}

const delimiter = ' .';
