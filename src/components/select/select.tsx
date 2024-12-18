import './select.scss'
import { forwardRef } from "react";

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    placeholder?: string;
    label?: string;
    error?: string;
    maps?: { value: number; title: string }[];
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((
    {
        placeholder,
        label,
        error,
        maps,
        onChange,
        ...props
    }, ref) => {
    return (
        <div className='container-select'>
            <label>{label} <span>*</span></label>
            <select onChange={onChange} ref={ref}  {...props}>
                <option value="">{placeholder}</option>
                {maps?.map((map, index) => (
                    <option key={index} value={map.value}>
                        {map.title}
                    </option>
                ))}
            </select>
            {error && <span className='error'>{error}</span>}
        </div>
    );
});

export default Select;
