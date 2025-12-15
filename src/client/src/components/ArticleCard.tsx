import { styles } from '@/styles';
import type { ArticleResult } from '@/types/ArticleResult';
import { css } from '@/util/css';

type ArticleCardProps = ArticleResult & {
    className?: string;
    placeholder?: boolean;
};

export function ArticleCard({ className, article, summary, placeholder = false, ...rest }: ArticleCardProps) {
    return (
        <section
            className={css(
                'flex flex-col overflow-hidden',
                styles.cardBg,
                styles.cardShadow,
                styles.cardRadius,
                className
            )}
            {...rest}
        >
            <article className='flex flex-col xl:flex-row basis-full'>
                {placeholder && <div className='flex basis-50 cursor-pointer basis-full h-full bg-indigo-500'></div>}
                {!placeholder && (
                    <a href={article?.url} className='flex basis-50 cursor-pointer basis-full h-full'>
                        <img
                            className='flex object-cover bg-black text-white'
                            src={article?.urlToImage}
                            alt={article?.title + ' Image'}
                        />
                    </a>
                )}
                {placeholder && <div className='flex flex-col basis-full p-5 gap-3 h-60'></div>}
                {!placeholder && (
                    <aside className='flex flex-col basis-full p-5 gap-3'>
                        <h2>
                            <a className='font-bold hover:underline' href={article?.url}>
                                {article?.title}
                            </a>
                        </h2>
                        <h3>
                            <a className={css('hover:underline', styles.altTextColor)} href={article?.url}>
                                @{article?.source?.name}
                            </a>
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
