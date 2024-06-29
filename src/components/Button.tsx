// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ text, className, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` items-center  h-10 bg-customBlue text-white  font-bold py-2 px-4 rounded ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
