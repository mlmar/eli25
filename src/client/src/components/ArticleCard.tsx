import { styles } from '@/styles';
import type { ArticleResult } from '@/types/ArticleResult';
import { css } from '@/util/css';
import { useId } from 'react';

type ArticleCardProps = ArticleResult & {
    className?: string;
    placeholder?: boolean;
};

export function ArticleCard({ className, article, summary, placeholder = false, ...rest }: ArticleCardProps) {
    const id = useId();
    const headingId = `article-title-${id}`;
    const hasUrl = Boolean(article?.url);
    const hasImage = Boolean(article?.urlToImage);

    return (
        <section
            aria-labelledby={headingId}
            className={css(
                'flex flex-col overflow-hidden',
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
            <article className='flex flex-col xl:flex-row basis-full'>
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
                            className='flex basis-50 cursor-pointer basis-full h-full bg-neutral-900 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500'
                            aria-label={`Open article: ${article?.title ?? 'Article'}`}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <figure className='w-full'>
                                {!hasImage && (
                                    <div
                                        role='img'
                                        aria-label='No image available'
                                        className='self-center w-full text-center cursor-pointer'
                                    >
                                        No Image Available
                                    </div>
                                )}
                                {hasImage && (
                                    <img
                                        className='flex object-cover bg-black text-white w-full h-full'
                                        src={article?.urlToImage}
                                        alt={article?.title ?? 'Article image'}
                                        loading='lazy'
                                    />
                                )}
                                <figcaption className='sr-only'>Article image for {article?.title}</figcaption>
                            </figure>
                        </a>
                    ) : (
                        <div
                            className='flex basis-50 cursor-default basis-full h-full bg-neutral-900 text-white'
                            aria-hidden='true'
                        >
                            {!hasImage ? (
                                <div
                                    role='img'
                                    aria-label='No image available'
                                    className='self-center w-full text-center'
                                >
                                    No Image Available
                                </div>
                            ) : (
                                <img
                                    className='flex object-cover bg-black text-white w-full h-full'
                                    src={article?.urlToImage}
                                    alt={article?.title ?? 'Article image'}
                                    loading='lazy'
                                />
                            )}
                        </div>
                    ))}
                {placeholder && <div className='flex flex-col basis-full p-5 gap-3' aria-hidden='true'></div>}
                {!placeholder && (
                    <aside className='flex flex-col basis-full p-5 gap-3'>
                        <h2 id={headingId}>
                            {hasUrl ? (
                                <a
                                    className='font-bold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500'
                                    href={article?.url}
                                    aria-label={`Open article: ${article?.title ?? 'Article'}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    {article?.title}
                                </a>
                            ) : (
                                <span className='font-bold'>{article?.title}</span>
                            )}
                        </h2>
                        <h3>
                            {article?.source?.name ? (
                                <a
                                    className={css(
                                        'hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500',
                                        styles.altTextColor
                                    )}
                                    href={article?.url ?? undefined}
                                    aria-label={`Source: ${article?.source?.name}`}
                                    target={hasUrl ? '_blank' : undefined}
                                    rel={hasUrl ? 'noopener noreferrer' : undefined}
                                >
                                    {`@${article?.source?.name}`}
                                </a>
                            ) : (
                                <span className={styles.altTextColor}>Unknown source</span>
                            )}
                        </h3>
                        <ul className='list-disc pl-5'>
                            {summary
                                ?.trim()
                                .split(delimiter)
                                .map((text, i) => {
                                    return Boolean(text.trim()) && <li key={text + '_' + i}> {text} </li>;
                                })}
                        </ul>
                    </aside>
                )}
            </article>
        </section>
    );
}

const delimiter = ' .';
