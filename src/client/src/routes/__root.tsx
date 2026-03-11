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
                    'flex items-center justify-center lg:pl-10 lg:pr-10 sm:px-5 p-2 text-white border-b border-gray-500',
                    styles.darkBg
                )}
            >
                <div className={css('flex justify-between', styles.pageWidth)}>
                    <Link to='..'>
                        <h1 className='font-bold sm:text-xl text-base'> eli25 </h1>
                    </Link>
                    <span className='flex gap-5'>
                        <IconLink className='sm:h-7 sm:w-7 h-4 invert ' src={githubImage} url={githubUrl} />
                        <IconLink className='sm:h-7 sm:w-7 h-4' src={portfolioImage} url={portfolioUrl} />
                    </span>
                </div>
            </header>
            <Outlet />
        </main>
    );
}

const githubImage = '/github.png';
const githubUrl = 'https://github.com/mlmar/eli25';
const portfolioImage = '/m.ico';
const portfolioUrl = 'https://mlmar.github.io';
