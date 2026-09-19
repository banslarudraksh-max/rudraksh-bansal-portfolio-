import React from 'react';
import { X, Plus } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={inputId} className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase">
        {label}
        {props.required && <span className="text-emerald-400 ml-1">*</span>}
      </label>
      <div className="relative rounded-xl shadow-inner">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl bg-neutral-900/90 border transition-all duration-200 text-sm text-neutral-100 placeholder:text-neutral-500 py-2.5 ${
            leftIcon ? 'pl-10 pr-4' : 'px-4'
          } ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-neutral-800 hover:border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
          } outline-none ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-neutral-400">{helperText}</p>}
    </div>
  );
};

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={inputId} className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase">
        {label}
        {props.required && <span className="text-emerald-400 ml-1">*</span>}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full rounded-xl bg-neutral-900/90 border px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 transition-all duration-200 resize-y outline-none ${
          error
            ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
            : 'border-neutral-800 hover:border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-neutral-400">{helperText}</p>}
    </div>
  );
};

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
  helperText?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={inputId} className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase">
        {label}
        {props.required && <span className="text-emerald-400 ml-1">*</span>}
      </label>
      <select
        id={inputId}
        className={`w-full rounded-xl bg-neutral-900 border px-4 py-2.5 text-sm text-neutral-100 transition-all duration-200 outline-none cursor-pointer ${
          error
            ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
            : 'border-neutral-800 hover:border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-neutral-900 text-neutral-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-neutral-400">{helperText}</p>}
    </div>
  );
};

interface FormToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export const FormToggle: React.FC<FormToggleProps> = ({
  label,
  description,
  checked,
  onChange,
  id,
}) => {
  const toggleId = id || `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
      <div className="pr-4">
        <label htmlFor={toggleId} className="text-sm font-medium text-neutral-200 cursor-pointer block">
          {label}
        </label>
        {description && <p className="text-xs text-neutral-400 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        id={toggleId}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${
          checked ? 'bg-emerald-500' : 'bg-neutral-800'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

interface FormChipsInputProps {
  label: string;
  chips: string[];
  onChange: (chips: string[]) => void;
  placeholder?: string;
  helperText?: string;
}

export const FormChipsInput: React.FC<FormChipsInputProps> = ({
  label,
  chips,
  onChange,
  placeholder = 'Type and press Enter',
  helperText,
}) => {
  const [inputVal, setInputVal] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = inputVal.trim();
      if (trimmed && !chips.includes(trimmed)) {
        onChange([...chips, trimmed]);
        setInputVal('');
      }
    }
  };

  const addChip = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !chips.includes(trimmed)) {
      onChange([...chips, trimmed]);
      setInputVal('');
    }
  };

  const removeChip = (indexToRemove: number) => {
    onChange(chips.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase">
        {label}
      </label>
      <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {chips.map((chip, index) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
            >
              {chip}
              <button
                type="button"
                onClick={() => removeChip(index)}
                className="hover:text-white p-0.5 rounded transition-colors"
                aria-label={`Remove ${chip}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none px-1"
          />
          <button
            type="button"
            onClick={addChip}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
      </div>
      {helperText && <p className="text-xs text-neutral-400">{helperText}</p>}
    </div>
  );
};
