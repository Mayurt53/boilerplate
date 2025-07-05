import React from 'react';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const inputClasses = [
    'input',
    error && 'input-error',
    success && 'input-success',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-neon-red ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-cyan">
            <span className="text-lg">{icon}</span>
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${inputClasses} ${icon && iconPosition === 'left' ? 'pl-12' : ''} ${icon && iconPosition === 'right' ? 'pr-12' : ''}`}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neon-cyan">
            <span className="text-lg">{icon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <div className="form-error flex items-center space-x-2">
          <span className="text-lg">⚠️</span>
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="text-neon-green text-sm flex items-center space-x-2">
          <span className="text-lg">✅</span>
          <span>{success}</span>
        </div>
      )}
    </div>
  );
};

export default Input; 