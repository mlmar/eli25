import './App.less';
import { useArticles } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import { Carousel } from '@/components/Carousel';

export default function App() {
    const { data: articles, isLoading: isArticlesLoading } = useArticles();

    return (
        <main className='bg-neutral-5500 h-full h-full w-full flex flex-col flex-auto justify-center bg-neutral-200'>
            <header className='pl-10 pr-10 pt-5 pb-5 bg-neutral-900 text-white shadow-md'>
                <h1 className='font-bold text-2xl'> eli25 </h1>
            </header>
            <Carousel className='p-10'>
                {renderInfo()}
                {isArticlesLoading && 'Loading...'}
                {articles?.map((props) => (
                    <ArticleCard className='max-h-fit w-full' {...props} key={props.article.url} />
                ))}
            </Carousel>
        </main>
    );
}

function renderInfo() {
    return (
        <label>
            Articles pulled daily from
            <a className='font-bold ml-1' href='https://newsapi.org/'>
                News API
            </a>
            , summarized with
            <a className='font-bold ml-1' href='https://huggingface.co/sshleifer/distilbart-cnn-12-6'>
                sshleifer/distilbart-cnn-12-6
            </a>
        </label>
    );
}

// const labelStyle = 'flex min-w-fit text-nowrap';
// const submitStyles = css(
//     'flex items-center justify-center',
//     'border border-solid rounded-full',
//     'p-1 w-8 h-8',
//     'text-violet-400',
//     'cursor-pointer',
//     'transition',
//     'hover:bg-violet-400',
//     'hover:border-violet-400',
//     'hover:text-white',
//     'disabled:opacity-50'
// );
