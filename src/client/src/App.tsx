import './App.less';
import { useArticles } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import { Carousel } from '@/components/Carousel';
import { Info } from '@/components/Info';
import { css } from '@/util/css';
import { styles } from '@/styles';
import { IconLink } from '@/components/IconLink';

export default function App() {
    const { data: articles, isLoading: isArticlesLoading } = useArticles();

    return (
        <main className='bg-neutral-5500 h-full h-full w-full flex flex-col flex-auto justify-center bg-neutral-200 overflow-auto'>
            <header
                className={css(
                    'flex items-center justify-between pl-10 pr-10 pt-3 pb-3 text-white shadow-md',
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
                <Info />
                <Carousel className='p-10'>
                    {isArticlesLoading && 'Loading...'}
                    {articles?.map((props) => (
                        <Carousel.Card key={props.article.url}>
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
