import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'outline' | 'subtle';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  to?: string; // if provided, render a React Router Link
  href?: string; // if provided, render an anchor tag
  target?: string;
}

const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-blue text-white hover:bg-brand-blue-dark',
  outline: 'border border-brand-blue text-brand-blue hover:bg-blue-50',
  subtle: 'bg-gray-100 text-brand-gray-900 hover:bg-gray-200',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  ...rest
}) => {
  const cls = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} {...(rest as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

export default Button;