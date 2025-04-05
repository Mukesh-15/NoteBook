import React from "react";

export default function SignUp() {
  return (
    <div className="container">
      <form>
      <div className="form-group">
          <label htmlFor="exampleInputText1">UserName</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputText1"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
