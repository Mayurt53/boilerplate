import React from 'react';

const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = false,
  interactive = false,
  ...props
}) => {
  const baseClasses = 'card';
  
  const variantClasses = {
    default: '',
    glass: 'card-glass',
    hover: 'card-hover',
    interactive: 'card-interactive'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    hover && 'card-hover',
    interactive && 'card-interactive',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card; 