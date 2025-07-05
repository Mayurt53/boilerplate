import React from 'react';

const Button = ({ 
  children, 
  variant = 'cyber', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'btn relative overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl'
  };

  const variantClasses = {
    cyber: 'btn-cyber',
    neon: 'btn-neon',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    success: 'btn-success'
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="text-lg">{icon}</span>
        )}
        
        <span>{children}</span>
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="text-lg">{icon}</span>
        )}
      </div>
    </button>
  );
};

export default Button; 