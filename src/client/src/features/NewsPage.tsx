import { useArticles } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import { Carousel } from '@/components/Carousel';
import { Info } from '@/components/Info';
import { styles } from '@/styles';
import { toFullDateString } from '@/util/date';
import { useLocation, useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { ButtonLink } from '@/components/ButtonLink';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'feather-icons-react';
import { css } from '@/util/css';
import { useCallback, useEffect } from 'react';

export function NewsPage() {
    const { date: currentDate } = useParams({
        strict: false
    });
    const { item = 0, prev = 0 } = useSearch({
        strict: false
    });
    const location = useLocation();
    const navigate = useNavigate();

    const { data, isLoading: isArticlesLoading } = useArticles(currentDate);
    const dateString = toFullDateString(currentDate || data?.results?.[0]?.date);

    const position = Math.min((data?.results?.length || 1) - 1, item);

    const isStart = position === 0;
    const getLeftPath = useCallback(() => {
        return {
            path: isStart ? '/' + data?.prev_date : location.pathname,
            search: {
                item: isStart ? 100 : Math.max(position - 1, 0),
                prev: item
            }
        };
    }, [isStart, position, data, location, item]);

    const isEnd = position === (data?.results?.length || 1) - 1;
    const getRightPath = useCallback(() => {
        return {
            path: isEnd ? '/' + data?.next_date : location.pathname,
            search: {
                item: isEnd ? 0 : Math.min(position + 1, (data?.results?.length || 1) - 1),
                prev: item
            }
        };
    }, [isEnd, position, data, location, item]);

    const navLeft = useCallback(() => {
        if (isStart && !data?.prev_date) {
            return;
        }
        const { path, search } = getLeftPath();
        navigate({
            to: path,
            search
        });
    }, [getLeftPath, navigate, isStart, data]);

    const navRight = useCallback(() => {
        if (isEnd && !data?.next_date) {
            return;
        }
        const { path, search } = getRightPath();
        navigate({
            to: path,
            search
        });
    }, [getRightPath, navigate, isEnd, data]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            event.stopPropagation();
            if (event.key === 'ArrowLeft') {
                navLeft();
            } else if (event.key === 'ArrowRight') {
                navRight();
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [navLeft, navRight]);

    function renderNavigation() {
        return (
            <nav className='flex flex-col gap-5'>
                <h2 className={styles.navigation}>
                    <ButtonLink
                        path={data?.prev_date}
                        search={{ item: 0 }}
                        loading={isArticlesLoading}
                        disabled={!data?.prev_date}
                    >
                        <ChevronsLeft aria-label='Previous Date' />
                    </ButtonLink>
                    {data?.results?.length && dateString}
                    {!data?.results?.length && !isArticlesLoading && 'No articles Found'}
                    {isArticlesLoading && 'Loading Articles...'}
                    <ButtonLink
                        path={data?.next_date}
                        search={{ item: 0 }}
                        loading={isArticlesLoading}
                        disabled={!data?.next_date}
                    >
                        <ChevronsRight aria-label='Next Date' />
                    </ButtonLink>
                </h2>
            </nav>
        );
    }

    function renderArrowButtons() {
        return (
            <nav className='flex justify-between'>
                <ButtonLink
                    className={css(
                        'md:absolute md:right-[100%] md:top-[50%] xs:left-[0%] xs:top-[100%]',
                        styles.arrowButton
                    )}
                    {...getLeftPath()}
                    loading={isArticlesLoading}
                    disabled={isStart && !data?.prev_date}
                >
                    <ChevronLeft aria-label='Previous Article' />
                </ButtonLink>

                <ButtonLink
                    className={css(
                        'md:absolute md:left-[100%] md:top-[50%] xs:right-[0%] xs:top-[100%]',
                        styles.arrowButton
                    )}
                    {...getRightPath()}
                    loading={isArticlesLoading}
                    disabled={isEnd && !data?.next_date}
                >
                    <ChevronRight aria-label='Next Article' />
                </ButtonLink>
            </nav>
        );
    }

    function renderDots() {
        return (
            <section className='flex gap-2 items-center justify-center'>
                {data?.results?.map((_item, i) => (
                    <ButtonLink
                        className={css(styles.dot, {
                            [styles.dotDark]: i <= position,
                            [styles.dotSelected]: i == position
                        })}
                        path={location.pathname}
                        search={{
                            item: i,
                            prev: item
                        }}
                        loading={isArticlesLoading}
                        aria-label={i.toString()}
                    ></ButtonLink>
                ))}
            </section>
        );
    }

    return (
        <section className='flex flex-col items-center basis-full gap-5 lg:p-10 md:p-5 p-2 overflow-auto'>
            <div className='flex flex-col items-stretch gap-5 sm:gap-2 w-[50em] max-w-[90vw] '>
                {renderNavigation()}
                <section className='flex flex-col relative gap-2'>
                    {renderDots()}
                    {isArticlesLoading && (
                        <Carousel className='placeholder w-full' position={0} direction={0}>
                            <ArticleCard placeholder />
                        </Carousel>
                    )}
                    {!isArticlesLoading && (
                        <Carousel
                            className='w-full'
                            position={position}
                            direction={position - prev}
                            onSwipe={(direction) => {
                                if (direction < 0) {
                                    navLeft();
                                } else if (direction > 0) {
                                    navRight();
                                }
                            }}
                        >
                            {data?.results?.map((props) => (
                                <ArticleCard className='max-h-[70dvh]' {...props} key={props?.article?.url} />
                            ))}
                        </Carousel>
                    )}
                    {renderArrowButtons()}
                </section>
                <Info />
            </div>
        </section>
    );
}
