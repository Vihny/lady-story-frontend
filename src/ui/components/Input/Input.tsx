import './input.scss'
import { ChangeEventHandler, forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
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
    return (
        <div className='container-input'>
            <label>{label} <span>*</span></label>
            <input 
                type={type} 
                name={name} 
                maxLength={maxLength} 
                onChange={onChange} 
                value={value} 
                ref={ref}
                placeholder={placeholder} 
                {...props}
            />
            {error && <span>{error}</span>}
        </div>
    );
});

export default Input;