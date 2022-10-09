import httpClient from "./httpClient.js";
import React, { useState } from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCoordinator, setIsCoordinator] = useState(false);

    const registerUser = async () => {
        console.log(email, password, isCoordinator);

        const resp = await httpClient.post("//localhost:5000/register", { email, password, isCoordinator });
        console.log("frpm the backedn");
        console.log(resp.data);

    };


    return (
        <div className="register">

            <h1>Register</h1>
            <form>
                <div>

                    <label>Email: </label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Unit Coordinator?</label>
                    <input type="checkbox" checked={isCoordinator} onChange={() => setIsCoordinator(!isCoordinator)} />
                </div>
                <button type="button" onClick={() => registerUser()}>Submit</button>
            </form>

        </div>
    );
}

export default Register;