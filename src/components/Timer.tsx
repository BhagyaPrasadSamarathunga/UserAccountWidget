import { formatTime } from '@/utils/utils';
import {useEffect, useState} from 'react';
import InfoRow from './InfoRow';

interface TimerProps {
    isActive: boolean;
}

const Timer = ({isActive}:TimerProps) => {
    const [miliSeconds, setMiliSeconds] = useState(0);

    useEffect(()=>{
        let intervel: number = 0;
        if(isActive){
            intervel = setInterval(()=>{
                setMiliSeconds(prevSecond => prevSecond + 1);
            }, 1);
            
        } else {
            intervel &&  clearInterval(intervel);
        }
        
        return () => clearInterval(intervel)
    },[isActive, setMiliSeconds]);

    return(
        <InfoRow title={'TIME'} style={{fontWeight: 'bold'}}>
            <div>{formatTime(miliSeconds)} </div>
        </InfoRow>   
    );
}
export default Timer;