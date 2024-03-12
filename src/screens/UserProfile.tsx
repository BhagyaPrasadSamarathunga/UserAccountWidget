import './UserProfile.css';
import { Profile } from '../types';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({profiles, onRemoveClick}:{profiles:Profile[] | undefined, onRemoveClick:(id:string) => void}) => {
    const navigate = useNavigate();
    return(
        <div className='container'>
            {profiles && profiles.map((item)=> 
            <div key={item.id} className='profileRow'>
                <a onClick={() => navigate(`/profile/${item.id}`)}>
                    {item.name} 
                </a>
                <button className='removeButton' onClick={()=>onRemoveClick(item.id)}>Remove</button>
            </div>
)}
        </div>
    )
}
export default UserProfile;