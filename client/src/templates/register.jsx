import httpClient from "./httpClient.js";
import React, { useState } from "react";

function Register () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const registerUser = async () => {
        console.log(email, password);
    
        const resp = await httpClient.post("//localhost:5000/register", {email, password});
        
        console.log(resp.data);

    };


    return (
    <div className="register">

                <h1>Register</h1>
                <form>
                    <div>
                    
                    <label>Email: </label>
                    <input type = "text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                <div>
                    <label>Password: </label>
                    <input type = "text" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <button type="button" onClick={() => registerUser()}>Submit</button>
                </form>

    </div>
    );
}

export default Register;