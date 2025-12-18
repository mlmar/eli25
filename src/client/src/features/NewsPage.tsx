import { useArticles } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import { Carousel } from '@/components/Carousel';
import { Info } from '@/components/Info';
import { css } from '@/util/css';
import { styles } from '@/styles';
import { IconLink } from '@/components/IconLink';
import { parseDateString } from '@/util/date';
import { useParams } from '@tanstack/react-router';
import { ButtonLink } from '@/components/ButtonLink';

export function NewsPage() {
    const { date: currentDate = '' } = useParams({
        strict: false
    });
    const { data, isLoading: isArticlesLoading } = useArticles(currentDate);

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
                <h2 className={styles.h2}>
                    <ButtonLink path={data?.prev_date}>&#171;</ButtonLink>
                    {parseDateString(currentDate || data?.results?.[0]?.date)}

                    <ButtonLink path={data?.next_date}>&#187;</ButtonLink>
                </h2>
                {!data?.results?.length && !isArticlesLoading && <h3 className={styles.h3}>No Articles Found</h3>}
                {isArticlesLoading && <h3 className={styles.h3}>Loading Articles...</h3>}
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
