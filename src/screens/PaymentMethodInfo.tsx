import './PaymentMethodInfo.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from '../hooks/useFetchData';
import InfoRow from "@/components/InfoRow";
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import { PaymentMethod } from '@/types';
import { PrimaryIndicator } from '@/components/PrimaryIndicator';

const PaymentMethodInfo = ()=> {
    const { id, paymentMethodId } = useParams();
    const {data: paymentMethodData, errorMsg: paymentMethodDataError , isLoad: isPaymentMethodLoading, getData: getPaymentMethodData} = useFetchData<PaymentMethod>();

    const [iban, setIban] = useState<string>();
    const [bic,setBic] = useState<string>();
    const [name,setName] = useState<string>();
    const [isPrimary,setIsPrimary] = useState<boolean>();

    useEffect(() => {
        getPaymentMethodData(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/${id}/paymentMethods/${paymentMethodId}`,'GET');
    }, []);

    useEffect(()=> {
        if(paymentMethodData) {
            setIban(paymentMethodData.iban);
            setBic(paymentMethodData.bic);
            setName(paymentMethodData.name);
            setIsPrimary(paymentMethodData.isPrimary);
        }
    }, [paymentMethodData]);

    return(
        <div className='container'>
            {isPaymentMethodLoading && <Loader /> || (
                <>
                    {isPrimary && <PrimaryIndicator/>}
                    <InfoRow title={'Name'}>
                        <div>{name}</div>
                    </InfoRow>
                    <InfoRow title={'IBAN'}>
                        <div>{iban}</div>
                    </InfoRow>
                    <InfoRow title={'BIC'}>
                        <div>{bic}</div>
                    </InfoRow>
                </>
            )}
            {paymentMethodDataError && <ErrorMessage message='Error in fetching payment method details' />}
        </div>
    )
}
export default PaymentMethodInfo;
