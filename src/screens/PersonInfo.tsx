import './PersonInfo.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from '../hooks/useFetchData';
import InfoRow from "@/components/InfoRow";
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import { Person } from '@/types';

const PersonInfo = ()=> {
    const { id, personId } = useParams();
    const {data: personData, errorMsg: personDataError , isLoad: isPersonDataLoading, getData: getPersonData} = useFetchData<Person>();

    const [salutation, setSalutation] = useState<string>();
    const [firstName,setFirstName] = useState<string>();
    const [lastName,setLastName] = useState<string>();

    useEffect(() => {
        getPersonData(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/${id}/persons/${personId}`,'GET');
    }, []);

    useEffect(()=> {
        if(personData) {
            setSalutation(personData.salutation);
            setFirstName(personData.firstName);
            setLastName(personData.lastName);
        }
    }, [personData]);

    return(
        <div className='container'>
            {isPersonDataLoading && <Loader /> || (
                <>
                    <InfoRow title={'SALUTATION'}>
                        <div>{salutation}</div>
                    </InfoRow>
                    <InfoRow title={'FIRSTNAME'}>
                        <div>{firstName}</div>
                    </InfoRow>
                    <InfoRow title={'LASTNAME'}>
                        <div>{lastName}</div>
                    </InfoRow>
                </>
            )}
            {personDataError && <ErrorMessage message='Error in fetching person details' />}
        </div>
    )
}
export default PersonInfo;
