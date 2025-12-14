import { styles } from '@/styles';
import { css } from '@/util/css';

const newsAPI = 'News API';
const newsAPIUrl = 'https://newsapi.org/';
const model = 'sshleifer/distilbart-cnn-12-6';
const modelUrl = 'https://huggingface.co/sshleifer/distilbart-cnn-12-6';

export function Info() {
    return (
        <section
            className={css(
                'flex flex-col gap-2 p-5 m-10 mb-0 border border-violet-500 text-white',
                styles.cardShadow,
                styles.cardRadius,
                styles.altBg
            )}
        >
            <label>
                Articles are pulled daily from
                <a className='font-bold ml-1 hover:underline' href={newsAPIUrl}>
                    {newsAPI}
                </a>
                , summarized with
                <a className='font-bold ml-1 hover:underline' href={modelUrl}>
                    {model}
                </a>
                .
            </label>
            <p>
                The following content may contain inaccuracies, omissions, or misinterpretations of the original source
                material. This should not be considered a substitute for the original article or professional advice.
            </p>
        </section>
    );
}
