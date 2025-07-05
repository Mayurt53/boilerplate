import React, { useState, useRef, useEffect } from 'react';
import useClickOutside from '../hooks/useClickOutside';

const Dropdown = ({
  trigger,
  items = [],
  placement = 'bottom',
  className = '',
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useClickOutside(() => setIsOpen(false));

  const placementClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < items.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : items.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && items[selectedIndex]) {
            handleSelect(items[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, items]);

  const handleSelect = (item) => {
    onSelect?.(item);
    setIsOpen(false);
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <div ref={triggerRef} onClick={handleTriggerClick}>
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 min-w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 ${placementClasses[placement]}`}
        >
          {items.map((item, index) => (
            <div
              key={item.key || index}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                selectedIndex === index
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !item.disabled && handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {item.icon && (
                <span className="mr-2">{item.icon}</span>
              )}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown; 