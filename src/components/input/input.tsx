import { applyMask } from '../../utils/mask';
import './input.scss'
import { ChangeEventHandler, forwardRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: 'cnpj' | 'phone' | 'cep' | 'text' | 'number' | 'date' | 'email' | 'cpf' | 'price';
    name?: string;
    maxLength?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value?: string;
    placeholder?: string;
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((
    {
        type,
        name,
        maxLength,
        onChange,
        value,
        placeholder,
        label,
        error,
        ...props
    }, ref) => {

    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        let maskedValue = value;
      
        if (type === 'cnpj' || type === 'phone' || type === 'cep' || type === 'cpf' || type === 'price') {
          maskedValue = applyMask(value, type);
        }
      
        setInputValue(maskedValue);
      
        if (onChange) {
          onChange(e); 
        }
    };
      
    return (
        <div className='container-input'>
            <label>{label} <span>*</span></label>
            <input 
                type={type} 
                name={name} 
                maxLength={maxLength} 
                onChange={handleChange} 
                value={inputValue} 
                ref={ref}
                placeholder={placeholder} 
                {...props}
            />
            {error && <span className='error'>{error}</span>}
        </div>
    );
});

export default Input;