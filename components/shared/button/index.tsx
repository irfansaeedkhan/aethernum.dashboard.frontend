import React from 'react';
import cn from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?:
    | 'primary'
    | 'primary-new'
    | 'secondary'
    | 'outline'
    | 'outline-new'
    | 'danger'
    | 'warning'
    | 'tertiary'
    | 'underline'
    | 'underline-gradient'
    | 'pending'
    | 'outlineBlue'
    | 'approved'
    | 'golden';

  IconStart?: React.ReactNode;
  IconEnd?: React.ReactNode;
  borderRounded?: string;
  backgroundColor?: string;
  loaderIcon?: React.ReactNode;
  outlineBG?: string;
  outlineBGNew?: string;
}
interface CustomCSSProperties extends React.CSSProperties {
  '--border-rounded': string;
  '--background-color': string;
  '--outline-bg'?: string;
}
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  className,
  IconStart,
  IconEnd,
  loaderIcon,
  borderRounded = '14px',
  backgroundColor = '#BCE300',
  outlineBG = 'light',
  outlineBGNew = 'bg-brand-gray',
  ...props
}) => {
  const customStyles: CustomCSSProperties = {
    '--border-rounded': borderRounded,
    '--background-color': backgroundColor,
  };
  const customStylesNew: CustomCSSProperties = {
    '--border-rounded': borderRounded,
    '--background-color': backgroundColor,
    '--outline-bg': outlineBGNew,
  };

  return (
    <button
      className={cn(
        'relative flex min-w-max cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[0.625rem] uppercase transition duration-200 ease-in-out md:px-4 md:py-3',
        variant === 'primary' && 'bg-gradient-pattern',
        variant === 'danger' && 'bg-gradient-pattern-red',
        variant === 'golden' && 'bg-brand-gold',
        variant === 'primary-new' && 'bg-gradient-pattern-new',
        variant === 'outline' && 'relative',
        variant === 'outline-new' && 'relative',
        variant === 'outlineBlue' && 'relative border border-brand-gold',
        variant === 'secondary' &&
          'hover:bg-blue-shade-1 border border-[#00020A] bg-light shadow-[0px_1px_2px_0px_rgba(16_24_40_0.05)] hover:text-white',
        variant === 'tertiary' && 'bg-blue-shade-1 text-white',
        variant === 'underline' && 'text-white underline',
        variant === 'underline-gradient' && 'text-gradient',
        variant === 'pending' &&
          'rounded-full border border-brand-red bg-brand-red !px-3 !py-1 !text-xs text-[#FF6565]',
        variant === 'approved' &&
          'border-brand-mint-shade-1 bg-brand-mint-shade-2 text-brand-mint-shade-1 rounded-full border !px-3 !py-1 !text-xs',
        className && className,
        props.disabled && 'cursor-not-allowed opacity-50'
      )}
      {...props}
      style={
        variant === 'primary'
          ? customStyles
          : variant === 'primary-new'
            ? customStylesNew
            : variant === 'outline-new'
              ? customStylesNew
              : undefined
      }
      disabled={props.disabled}
    >
      <span className="relative z-[5] mt-[2px] flex items-center justify-center truncate md:mt-0">
        {IconStart && IconStart}
        <span
          className={cn(
            'font-nexablack font-black leading-[normal]',
            variant === 'primary' && 'text-white',
            variant === 'danger' && 'text-white',
            variant === 'outline' && 'text-gradient',
            variant === 'outline-new' && 'text-gradient',
            variant === 'outlineBlue' && 'text-brand-gold',
            variant === 'tertiary' && 'text-white',
            variant === 'underline-gradient' && `text-gradient gradient-border-bottom`
          )}
        >
          {loaderIcon ? loaderIcon : title}
        </span>
        {IconEnd && IconEnd}
      </span>

      {variant === 'outline' && (
        <>
          {/* Using ::before for gradient border */}
          <span className="absolute inset-0 z-0 w-full rounded-xl bg-gradient-pattern p-px">
            <span className={`block bg-${outlineBG} h-full w-full rounded-xl`}></span>
          </span>
        </>
      )}
      {variant === 'outline-new' && (
        <>
          {/* Using ::before for gradient border */}
          <span className="absolute inset-0 z-0 w-full rounded-xl bg-gradient-pattern p-px">
            <span className={`block ${outlineBGNew} h-full w-full rounded-xl`}></span>
          </span>
        </>
      )}
    </button>
  );
};
