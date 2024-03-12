import { useEffect, useState } from 'react';
import { UserAccount } from '../types';
import InfoRow from './InfoRow';

const UserAccountComponent = ({userData}:{userData:UserAccount | undefined}) => {
    const[email,setEmail] = useState<string>('');
    const[profile,setProfile] = useState<number>(0);
    const[person,setPerson] = useState<number>(0);
    const[address,setAddress] = useState<number>(0);
    const[payment,setPayment] = useState<number>(0);
    const[meter,setMeter] = useState<number>(0);

    useEffect(() => {
        if(userData) {
            setEmail(userData.email);
            setProfile(userData.profiles?userData.profiles.length:0);
            if (userData.profiles) {
                let personsCount = 0;
                let addressCount = 0;
                let paymentCount = 0;
                let meterCount = 0;
                for(let i =0; i < userData.profiles.length; i++ ) {
                    personsCount = personsCount + userData.profiles[i].persons?.length;
                    addressCount = addressCount + userData.profiles[i].addresses?.length;
                    paymentCount = paymentCount + userData.profiles[i].paymentMethods?.length;
                    for(let y=0; y < userData.profiles[i].addresses.length; y++){
                        meterCount = meterCount + userData.profiles[i].addresses[y].meters?.length;
                    }
                }
                setPerson(personsCount);
                setAddress(addressCount);
                setPayment(paymentCount);
                setMeter(meterCount);
            }
        }
        
    }, [userData])
    return (
        <div>
            <InfoRow title={'EMAIL'}>
                <div>{email}</div>
            </InfoRow>
            <InfoRow title={'Profiles'}>
                <div>{profile}</div>
            </InfoRow>
            <InfoRow title={'Persons'}>
                <div>{person}</div>
            </InfoRow>
            <InfoRow title={'Addresses'}>
                <div>{address}</div>
            </InfoRow>
            <InfoRow title={'Payments'}>
                <div>{payment}</div>
            </InfoRow>
            <InfoRow title={'Meters'}>
                <div>{meter}</div>
            </InfoRow>
        </div>
    )
}
export default UserAccountComponent;