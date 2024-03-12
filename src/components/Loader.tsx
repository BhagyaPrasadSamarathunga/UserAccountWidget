import './Loader.css';
import { CSSProperties } from 'react';

const Loader = ({style}:{style?: CSSProperties}) => {
    return (
        <div className='loaderContainer' style={style}>
            <span className="loader"></span>
        </div>
    );
}

export default Loader;