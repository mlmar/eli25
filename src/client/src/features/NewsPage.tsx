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
            Boolean(dateString) && (
                <h2 className={styles.h2}>
                    <ButtonLink path={data?.prev_date} loading={isArticlesLoading}>
                        &#171;
                    </ButtonLink>
                    {dateString}
                    <ButtonLink path={data?.next_date} loading={isArticlesLoading}>
                        &#187;
                    </ButtonLink>
                </h2>
            )
        );
    }

    return (
        <>
            <section className='flex flex-col basis-full overflow-auto'>
                <Info className='lg:mt-10 lg:ml-10 lg:mr-10 m-5 mb-0' />
                {renderNavigation()}
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
                {Boolean(data?.results?.length) && !isArticlesLoading && renderNavigation()}
            </section>
        </>
    );
}
