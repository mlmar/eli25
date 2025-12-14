import type { ArticleResult } from '@/types/ArticleResult';
import { css } from '@/util/css';

type ArticleCardProps = ArticleResult & {
    className?: string;
};

export function ArticleCard({ className, article, summary }: ArticleCardProps) {
    return (
        <section className={css('flex flex-col rounded-2xl overflow-hidden shadow-xl bg-neutral-100', className)}>
            <article className='flex basis-full'>
                <a href={article.url} className='flex basis-50 cursor-pointer basis-full min-h-60'>
                    <img
                        className='flex object-cover bg-black'
                        src={article.urlToImage}
                        alt={article.title + ' Image'}
                    />
                </a>
                <aside className='flex flex-col basis-full p-5 gap-3'>
                    <h2 className='font-bold'>
                        <a href={article.url}>{article.title}</a>
                    </h2>
                    <h3>{article.source.name}</h3>
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

const delimiter = '.';
