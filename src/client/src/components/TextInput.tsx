import { css } from '@/util/css';

export function TextInput({ className, ...rest }: React.ComponentPropsWithoutRef<'input'>) {
    return <input className={css(inputStyle, className)} {...rest} />;
}

const inputStyle = 'flex ml-2 field-sizing-content focus:outline-none text-violet-400 transition';
