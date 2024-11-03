import "./button.scss";
import * as Icons from 'react-feather';

interface ButtonProps {
   title: string;
   onPress?: () => void;
   icon: keyof typeof Icons;
   className?: string;
}

function Button({title, onPress, icon, className}: ButtonProps) {
   const Icon = Icons[icon]
   return <>
         <button onClick={onPress} className={className}>
            <Icon size={24} color='#ffffff'/>
            <span>{title}</span>         
         </button>
   </>

}

export default Button;