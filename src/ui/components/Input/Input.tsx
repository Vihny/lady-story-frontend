import './Input.scss'
import { ChangeEventHandler } from "react";

interface InputProps {
    type?: string;
    name?: string;
    maxLength?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value?: string;
    ref?: string;
    placeholder?: string;
    label?: string;
}

function Input({
    type,
    name,
    maxLength,
    onChange,
    value,
    ref,
    placeholder,
    label
}: InputProps) {

    return (
        <>
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
                />
            </div>
        </>
    )
}

export default Input;