import React,{useEffect} from 'react'

export default function Logout() {
    useEffect(()=>{
        localStorage.removeItem("token");
    },[]);
  return (
    <div>
      loged out!
    </div>
  )
}
