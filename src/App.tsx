import './App.css';
import useFetchData from './hooks/useFetchData';
import { useEffect, useState } from 'react';
import { UserAccount } from './types';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserAccountComponent from './components/UserAccountComponent';
import UserProfile from './screens/UserProfile';
import ProfileInfo from './screens/ProfileInfo';
import PersonInfo from './screens/PersonInfo';
import AddressInfo from './screens/AddressInfo';
import PaymentMethodInfo from './screens/PaymentMethodInfo';
import Loader from './components/Loader';
import Timer from './components/Timer';
import ErrorMessage from './components/ErrorMessage';

export const App = () => {
    const {data: usersData, errorMsg: usersDataError , isLoad: isUsersDataLoading, getData: getUsersData} = useFetchData<UserAccount>();
    const {data: deleteResult, errorMsg: deleteError , isLoad: isDeleting, getData: deleteProfile} = useFetchData();
    const [userData , setUserData] = useState<UserAccount>();

    useEffect(() => {
        getUsersData(import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL,'GET');
    }, []);

    useEffect(()=>{
        if(usersData) {
            setUserData(usersData);
        }
    },[usersData]);

    useEffect(()=>{
        if(deleteResult) {
            getUsersData(import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL,'GET');
        }
        
    },[deleteResult]);

    const handelDelete = (id:string) => {
        deleteProfile(`${import.meta.env.VITE_USER_ACCOUNT_BACKEND_URL}/profiles/${id}`,'DELETE'); 
    };

    return (
        <Router>
            <div className='container'> 
                <div className='content'>
                    <div className='userAccount'>
                        <Timer isActive={isUsersDataLoading} />
                        {(isUsersDataLoading || isDeleting) && <Loader/>}
                        <UserAccountComponent userData={userData} />
                    </div>
                    <Routes>
                        <Route path="/" element={
                            <UserProfile 
                                profiles={userData ? userData.profiles : []} 
                                onRemoveClick={(id)=>handelDelete(id)}/>}/>
                        <Route path="/profile/:id" element={
                            <ProfileInfo/>}/>
                        <Route path="/profile/:id/persons/:personId" element={
                            <PersonInfo/>}/>
                        <Route path="/profile/:id/addresses/:addressId" element={
                            <AddressInfo/>}/>
                        <Route path="/profile/:id/paymentMethods/:paymentMethodId" element={
                            <PaymentMethodInfo/>}/>
                    </Routes>

                    {usersDataError && <ErrorMessage message='Error in fetching user data' />}
                    {deleteError && <ErrorMessage message='Error in deleting profile' />}
                </div>
            </div>
        </Router>

    );
};
