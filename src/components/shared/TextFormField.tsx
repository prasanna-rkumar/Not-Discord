import { FC } from "react";

interface TextFormFieldInput {
  label: string;
  required?: boolean;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFormField: FC<TextFormFieldInput> = ({
  label,
  type,
  placeholder,
  value,
  required = false,
  onChange,
}) => (
  <div className="mb-4 box-border w-full">
    <label className="text-sm text-gray-500 font-medium">
      {label}
      <input
        required={required}
        className="block mt-2 border-2 border-gray-lightest text-black text-base border-opacity-50 rounded w-full h-10 pl-3"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

export default TextFormField;
