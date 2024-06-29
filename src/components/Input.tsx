// src/components/Input.tsx
import React from 'react';
import { useField } from 'formik';

interface InputProps {
  label: string;
  name: string;
  type: string;
  errorMessage?: string; 
}

const Input: React.FC<InputProps> = ({ label, errorMessage, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.name}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${meta.touched && meta.error ? 'border-red-500' : ''}`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
      {errorMessage && !meta.error ? (
        <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default Input;
