import './ErrorMessage.css';
import { CSSProperties } from 'react';

const ErrorMessage = ({message, style}:{message:string; style?: CSSProperties}) => {
    return (
        <div className='errorMessagecontainer' style={style}>
            <div className="errorMessage">{message}</div>
        </div>
    );
}

export default ErrorMessage;