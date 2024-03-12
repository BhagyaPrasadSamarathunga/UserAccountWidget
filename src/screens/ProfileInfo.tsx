import './ProfileInfo.css';
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from '../hooks/useFetchData';
import { Person,Address,PaymentMethod, Profile } from '../types';
import { useNavigate } from 'react-router-dom';
import InfoRow from "@/components/InfoRow";
import Loader from "@/components/Loader";
import ErrorMessage from '@/components/ErrorMessage';

const ProfileInfo = ()=> {
    const { id } = useParams();
    const navigate = useNavigate();
    const {data: profileData, errorMsg: profileDataError , isLoad: isProfileDataLoading, getData: getProfileData} = useFetchData<Profile>();

    const [name,setName] = useState<string>();
    const [persons,setPersons] = useState<Person[]>();
    const [address,setAddress] = useState<Address[]>();
    const [paymentMethods,setPaymentMethods] = useState<PaymentMethod[]>();

    useEffect(() => {
        getProfileData(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/${id}`,'GET');
    }, []);
    useEffect(()=> {
        if(profileData) {
            setName(profileData.name);
            setPersons(profileData.persons);
            setAddress(profileData.addresses);
            setPaymentMethods(profileData.paymentMethods);
        }
    }, [profileData]);

    return(
        <div className='container'>
            {isProfileDataLoading && <Loader /> || (
                <>
                    <InfoRow title={'NAME'}>
                        <div>{name}</div>
                    </InfoRow>
                    <InfoRow title={'PERSONS'}>
                            <div>{persons?.map((item) => <ul key={item.id} onClick={() => navigate(`/profile/${id}/persons/${item.id}`)}>{item.salutation} {item.firstName} {item.lastName}</ul>)}</div>
                    </InfoRow>
                    <InfoRow title={'ADDRESSES'}>
                        <div>{address?.map((item) => <ul key={item.id} onClick={() => navigate(`/profile/${id}/addresses/${item.id}`)}>{item.postalCode} - {item.name}</ul>)}</div>
                    </InfoRow>
                    <InfoRow title={'PAYMENT METHODS'}>
                            <div>{paymentMethods?.map((item) => <ul key={item.id} onClick={() => navigate(`/profile/${id}/paymentMethods/${item.id}`)}>{item.name}</ul>)}</div>
                    </InfoRow>
                </>
            )}

            {profileDataError && <ErrorMessage message='Error in fetching profile details' />}
            
        </div>
    )
}
export default ProfileInfo;