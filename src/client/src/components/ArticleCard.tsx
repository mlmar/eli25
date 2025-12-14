import { styles } from '@/styles';
import type { ArticleResult } from '@/types/ArticleResult';
import { css } from '@/util/css';

type ArticleCardProps = ArticleResult & {
    className?: string;
};

export function ArticleCard({ className, article, summary, ...rest }: ArticleCardProps) {
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
            <article className='flex flex-col md:flex-row basis-full'>
                <a href={article.url} className='flex basis-50 cursor-pointer basis-full min-h-60'>
                    <img
                        className='flex object-cover bg-black w-full h-full'
                        src={article.urlToImage}
                        alt={article.title + ' Image'}
                    />
                </a>
                <aside className='flex flex-col basis-full p-5 gap-3'>
                    <h2>
                        <a className='font-bold' href={article.url}>
                            {article.title}
                        </a>
                    </h2>
                    <h3>
                        <a className={css('hover:underline', styles.altTextColor)} href={article.url}>
                            @{article.source.name}
                        </a>
                    </h3>
                    {/* <p>{article.content}</p> */}
                    <ul className='list-disc pl-5'>
                        {summary
                            .trim()
                            .split(delimiter)
                            .map((text, i) => {
                                return Boolean(text.trim()) && <li key={text + '_' + i}> {text} </li>;
                            })}
                    </ul>
                </aside>
            </article>
        </section>
    );
}

const delimiter = ' .';
