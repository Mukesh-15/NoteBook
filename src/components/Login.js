import {React,useState,useContext} from "react";
import alertContext from "../context/notes/alertContext";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [cred,setCred] = useState({email:"",password:""});
  const {setAlert} = useContext(alertContext);
  const navigate = useNavigate();
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:cred.email,password:cred.password}),
    });
    const json = await response.json();
    if(json.success){
      setAlert("success","Login Successful");
      //save user token
      localStorage.setItem('token',json.authToken);
      //redirect to home
      navigate('/');
    }else{
      setAlert("danger",json.error);
    }
    console.log(json);
  };


  return (
    <div className="container my-5">
      <form >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={cred.email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            value={cred.password}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            autoComplete="true"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}
