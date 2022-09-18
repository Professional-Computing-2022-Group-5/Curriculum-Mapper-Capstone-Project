
import httpClient from "./httpClient.js";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const logInUser = async () => {
      console.log(email, password);

      try {
          const resp = await httpClient.post("//localhost:5000/login", {
            email,
            password,
          });
          console.log(resp.data)
    
        } catch (error) {
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      };

  return ( 
    <div className="login">

    <h1>Log In</h1>
    <form>
        <div>
        
        <label>Email: </label>
        <input type = "text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
    <div>
        <label>Password: </label>
        <input type = "text" value={password} onChange={(e)=> setPassword(e.target.value)}/>
    </div>
    <button type="button" onClick={() => logInUser()}>Submit</button>
    </form>

    </div>

  );
}

export default Login;

