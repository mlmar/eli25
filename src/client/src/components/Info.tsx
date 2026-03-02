import { styles } from '@/styles';
import { css } from '@/util/css';
import { Info as InfoIcon } from 'feather-icons-react';

const newsAPI = 'News API';
const newsAPIUrl = 'https://newsapi.org/';
const model = 'sshleifer/distilbart-cnn-12-6';
const modelUrl = 'https://huggingface.co/sshleifer/distilbart-cnn-12-6';

type InfoProps = {
    className?: string;
};

export function Info({ className }: InfoProps) {
    return (
        <section
            className={css(
                'flex gap-4 p-5 border border-violet-500 text-white text-sm',
                styles.cardShadow,
                styles.cardRadius,
                styles.altBg,
                className
            )}
        >
            <div className='flex flex-col gap-2'>
                <p>
                    <InfoIcon className='inline-block text-base min-w-[1.5em] mr-2 mt-[-.2em]' />
                    Articles are pulled daily from
                    <a className='font-bold ml-1 mr-1 hover:underline' href={newsAPIUrl}>
                        {newsAPI}
                    </a>
                    and summarized with
                    <a className='font-bold ml-1 hover:underline' href={modelUrl}>
                        {model}
                    </a>
                    .
                </p>
                <p>
                    The following content may contain inaccuracies, omissions, or misinterpretations of the original
                    source material. This should not be considered a substitute for the original article or professional
                    advice.
                </p>
            </div>
        </section>
    );
}
