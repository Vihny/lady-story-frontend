import "./Button.scss";
import * as Icons from 'react-feather';


interface ButtonProps {
   title: string;
   onPress: () => void;
   icon: keyof typeof Icons;
}


function Button({title, onPress, icon}: ButtonProps) {
   const Icon = Icons[icon]
   return <>
         <button onClick={onPress}>
            <Icon size={24} color='#ffffff'/>
            <span>{title}</span>         
         </button>
   </>

}

export default Button;