import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem("token");
        setTimeout(()=>{
          navigate('/login');
        },2000);
        // eslint-disable-next-line
    },[]);
  return (
    <div className='container mt-5'>
      <h3>Loged out!</h3>
    </div>
  )
}
