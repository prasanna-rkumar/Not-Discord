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
    <label className=" text-xxs text-white-muted uppercase font-semibold">
      {label}
      <input
        required={required}
        className="block border-2 mt-0.5 border-gray-lightest text-black text-base border-opacity-50 rounded w-full h-10 pl-2"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

export default TextFormField;
