import { useArticles } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import { Carousel } from '@/components/Carousel';
import { Info } from '@/components/Info';
import { styles } from '@/styles';
import { toFullDateString } from '@/util/date';
import { useParams } from '@tanstack/react-router';
import { ButtonLink } from '@/components/ButtonLink';

export function NewsPage() {
    const { date: currentDate } = useParams({
        strict: false
    });
    const { data, isLoading: isArticlesLoading } = useArticles(currentDate);
    const dateString = toFullDateString(currentDate || data?.results?.[0]?.date);

    function renderNavigation() {
        return (
            <h2 className={styles.navigation}>
                <ButtonLink path={data?.prev_date} loading={isArticlesLoading}>
                    &#171;
                </ButtonLink>
                {data?.results?.length && dateString}
                {!data?.results?.length && !isArticlesLoading && 'No articles Found'}
                {isArticlesLoading && 'Loading Articles...'}
                <ButtonLink path={data?.next_date} loading={isArticlesLoading}>
                    &#187;
                </ButtonLink>
            </h2>
        );
    }

    return (
        <>
            <section className='flex flex-col basis-full overflow-auto gap-5 lg:p-10 md:p-5 p-2'>
                <Info />
                {renderNavigation()}
                {isArticlesLoading && (
                    <Carousel className='placeholder'>
                        <ArticleCard placeholder />
                        <ArticleCard placeholder />
                        <ArticleCard placeholder />
                        <ArticleCard placeholder />
                    </Carousel>
                )}
                <Carousel className=''>
                    {data?.results?.map((props) => (
                        <Carousel.Card key={props?.article?.url}>
                            <ArticleCard {...props} />
                        </Carousel.Card>
                    ))}
                </Carousel>
                {Boolean(data?.results?.length) && !isArticlesLoading && renderNavigation()}
            </section>
        </>
    );
}
