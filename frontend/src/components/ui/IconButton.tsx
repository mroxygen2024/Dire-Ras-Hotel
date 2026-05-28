import React from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  'aria-label': string;
  title?: string;
};

export const IconButton = ({ children, title, ...props }: IconButtonProps) => {
  return (
    <button {...props} title={title ?? props['aria-label']}>
      {children}
    </button>
  );
};

export default IconButton;
