import './stepper.scss';

interface StepperProps {
    labels: string[];
    selectedIndex: number;
    onStepChange: (index: number) => void;
    activeColor?: string;
    beforeColor?: string;
}

function Stepper({ labels, selectedIndex, onStepChange, activeColor, beforeColor }: StepperProps) {
    return (
        <div className="container-stepper">
            {labels.map((label, index) => (
                <button
                    key={label}
                    className={`button-stepper ${selectedIndex === index ? 'active' : ''}`}
                    onClick={() => onStepChange(index)}
                    style={{ 
                        color: selectedIndex === index ? activeColor : '#525256',
                        '--before-color': selectedIndex === index ? beforeColor : 'transparent' // Variável CSS
                    } as React.CSSProperties} 
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

export default Stepper;
