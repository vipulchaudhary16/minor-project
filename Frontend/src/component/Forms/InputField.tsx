interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  name,
  value,
  required = true,
  onChange,
  isDisabled = false,
}) => {
  return (
    <div className="mb-[1.6rem]">
      <label
        htmlFor={name}
        className="block text-[1.2rem] font-semibold mb-[.8rem]"
      >
        {label} <span className="text-red-500">{required ? ' *' : ''}</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="w-full px-[1.2rem] py-[.8rem] border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]"
        value={value}
        onChange={onChange}
        required={required}
        disabled={isDisabled}
      />
    </div>
  );
};

export default InputField;
