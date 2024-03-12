import './AddressInfo.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from '../hooks/useFetchData';
import InfoRow from "@/components/InfoRow";
import { Address, Meter } from "@/types";
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import { PrimaryIndicator } from '@/components/PrimaryIndicator';

const AddressInfo = ()=> {
    const { id, addressId } = useParams();
    const {data: addressData, errorMsg: addressDataError , isLoad: isAddressDataLoading, getData: getAddressData} = useFetchData<Address>();

    const [postCode, setPostCode] = useState<string>();
    const [city,setCity] = useState<string>();
    const [street,setStreet] = useState<string>();
    const [number,setNumber] = useState<string>();
    const [meters,setMeters] = useState<Meter[]>();
    const [isPrimary,setIsPrimary] = useState<boolean>(false);

    useEffect(() => {
        getAddressData(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/${id}/addresses/${addressId}`,'GET');
    }, []);

    useEffect(()=> {
        if(addressData) {
            setPostCode(addressData.postalCode);
            setCity(addressData.city);
            setStreet(addressData.street);
            setNumber(addressData.houseNumber);
            setMeters(addressData.meters);
            setIsPrimary(addressData.isPrimaryBilling && addressData.isPrimaryMailing && addressData.isPrimaryShipping);
            
        }
    }, [addressData]);

    return(
        <div className="container">
            {isAddressDataLoading && <Loader/> || (
                <>
                    {isPrimary && <PrimaryIndicator/>}
                    <InfoRow title={'POSTCODE'}>
                        <div className="itemContainer">{postCode}</div>
                    </InfoRow>
                    <InfoRow title={'CITY'}>
                        <div className="itemContainer">{city}</div>
                    </InfoRow>
                    <InfoRow title={'STREET'}>
                        <div className="itemContainer">{street}</div>
                    </InfoRow>
                    <InfoRow title={'NUMBER'}>
                        <div className="itemContainer">{number}</div>
                    </InfoRow>
                    <InfoRow title={'METERS'}>
                        <div className="itemContainer">
                            {(meters && meters.length > 0) ? 
                            meters.map((item)=><ul key={item.id}>{item.type} - {item.number}</ul> ) :
                            "No meters available"}
                        </div>
                    </InfoRow>
                </>
            )}
            {addressDataError && <ErrorMessage message='Error in fetching address details' />}
        </div>
    )
}
export default AddressInfo;
