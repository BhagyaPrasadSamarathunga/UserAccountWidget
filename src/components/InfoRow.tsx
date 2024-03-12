import './InfoRow.css';
import { CSSProperties, ReactNode } from "react";

 const InfoRow = ({title, children, style}: {title: string; children: ReactNode; style?: CSSProperties}) => {        
    return (
        <div className="rowContainer" style={style}>
            <div className='title'>{title} :</div> 
            {children}
        </div>
        
    );
};

export default InfoRow;