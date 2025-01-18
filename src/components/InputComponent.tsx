import React from 'react';

interface InputProps {
    label: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    placeholder?: string;
    options?: string[];
    as?: 'input' | 'textarea' | 'select';
     id?: string;
}

const InputComponent: React.FC<InputProps> = ({
    label,
    type,
    value,
    onChange,
    placeholder = '',
    options = [],
     as = 'input',
    id,

}) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block mb-2 text-sm font-medium dark:text-white">
          {label}
        </label>
            {as === 'input' && (
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
            )}
          {as === 'textarea' && (
              <textarea
              id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-vertical"
                rows={3}
              />
            )}
         {as === 'select' && (
                 <select
                   id={id}
                    value={value}
                    onChange={onChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
            )}
      </div>
    );
  };

export default InputComponent;