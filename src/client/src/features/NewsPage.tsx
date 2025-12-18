import { useArticles } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import { Carousel } from '@/components/Carousel';
import { Info } from '@/components/Info';
import { css } from '@/util/css';
import { styles } from '@/styles';
import { IconLink } from '@/components/IconLink';
import { parseDateString } from '@/util/date';
import { Link, useParams } from '@tanstack/react-router';

export function NewsPage() {
    const params = useParams({
        strict: false
    });
    const { data, isLoading: isArticlesLoading } = useArticles(params.date ?? '');

    return (
        <main className='bg-neutral-5500 h-full w-full flex flex-col flex-auto justify-center bg-neutral-200'>
            <header
                className={css(
                    'flex items-center justify-between lg:pl-10 lg:pr-10 pl-5 pr-5 pt-3 pb-3 text-white shadow-md',
                    styles.darkBg
                )}
            >
                <h1 className='font-bold text-xl'> eli25 </h1>
                <span className='flex gap-5'>
                    <IconLink className='invert h-7 w-7' src={githubImage} url={githubUrl} />
                    <IconLink className='h-full h-7 w-7' src={portfolioImage} url={portfolioUrl} />
                </span>
            </header>
            <section className='flex flex-col basis-full overflow-auto'>
                <Info className='lg:mt-10 lg:ml-10 lg:mr-10 m-5 mb-0' />
                <h2 className='flex lg:mt-10 lg:ml-10 lg:mr-10 lg:justify-start justify-center m-5 mb-0 text-2xl font-bold gap-1 :h'>
                    <Link to={'/' + data?.prev_date} disabled={!data?.prev_date}>
                        <button className={buttonClassNames} disabled={!data?.prev_date}>
                            &#171;
                        </button>
                    </Link>
                    {isArticlesLoading ? 'Loading articles...' : parseDateString(data?.results?.[0]?.date)}
                    <Link to={'/' + data?.next_date} disabled={!data?.next_date}>
                        <button className={buttonClassNames} disabled={!data?.next_date}>
                            &#187;
                        </button>
                    </Link>
                </h2>
                {!data?.results?.length && !isArticlesLoading && (
                    <h3 className='lg:mt-10 lg:ml-10 lg:mr-10 m-5 mb-0 text-2xl font-bold'>No Articles Found</h3>
                )}
                {isArticlesLoading && (
                    <Carousel className='lg:p-10 p-5 placeholder'>
                        <ArticleCard placeholder />
                        <ArticleCard placeholder />
                        <ArticleCard placeholder />
                        <ArticleCard placeholder />
                    </Carousel>
                )}
                <Carousel className='lg:p-10 p-5'>
                    {data?.results?.map((props) => (
                        <Carousel.Card key={props?.article?.url}>
                            <ArticleCard {...props} />
                        </Carousel.Card>
                    ))}
                </Carousel>
            </section>
        </main>
    );
}

const githubImage = '/github.png';
const githubUrl = 'https://github.com/mlmar/eli25';
const portfolioImage = '/m.ico';
const portfolioUrl = 'https://mlmar.github.io';

const buttonClassNames = `cursor-pointer pl-2 pr-2 hover:${styles.altTextColor} disabled:opacity-50`;
