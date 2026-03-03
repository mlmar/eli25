import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { NewsPage } from '@/features/NewsPage';
import { IconLink } from '@/components/IconLink';
import { css } from '@/util/css';
import { styles } from '@/styles';

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: NewsPage
});

function RootComponent() {
    return (
        <main className='bg-neutral-5500 h-full w-full flex flex-col flex-auto bg-neutral-200 min-h-fit'>
            <header
                className={css(
                    'flex items-center justify-between lg:pl-10 lg:pr-10 sm:px-5 px-3 py-3 text-white border-b border-gray-500',
                    styles.darkBg
                )}
            >
                <Link to='..'>
                    <h1 className='font-bold text-xl'> eli25 </h1>
                </Link>
                <span className='flex gap-5'>
                    <IconLink className='invert h-7 w-7' src={githubImage} url={githubUrl} />
                    <IconLink className='h-full h-7 w-7' src={portfolioImage} url={portfolioUrl} />
                </span>
            </header>
            <Outlet />
        </main>
    );
}

const githubImage = '/github.png';
const githubUrl = 'https://github.com/mlmar/eli25';
const portfolioImage = '/m.ico';
const portfolioUrl = 'https://mlmar.github.io';
