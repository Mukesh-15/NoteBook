import {React,useState,useContext} from "react";
import { useNavigate } from 'react-router-dom';
import alertContext from "../context/notes/alertContext";

export default function SignUp() {
  const [cred,setCred] = useState({username:"",email:"",password:""});
  const {setAlert} = useContext(alertContext);
  const navigate = useNavigate();
  
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:cred.username,email:cred.email,password:cred.password}),
    });
    const json = await response.json();
    if(json.success){
      setAlert("success","Signin Successful");
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
    <div className="container mt-3">
      <form>
      <div className="form-group">
          <label htmlFor="exampleInputText1">UserName</label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="exampleInputText1"
            placeholder="Username"
            value={cred.username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={cred.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={cred.password}
            onChange={onChange}
            autoComplete="true"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
