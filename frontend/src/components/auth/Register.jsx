import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {email, password, passwordCheck, displayName};
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5000/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
   
    return ( 
        <><>
            <div class="container ">
                <div class="row">
                    <div class="col">
                        
                    </div>
                    <div class="col">
                    <div >
                <h2 className='text-center'>Register</h2>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <form onSubmit={submit}>
                <div class="mb-3"> <label className="form-label">Email: </label>
                    <input className='form-control' type="email" id="email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div class="mb-3">
                    <label className="form-label">Password: </label>
                    <input type="password" className='form-control' id="password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div class="mb-3">
                    <label className="form-label"> Confirm Password: </label>
                    <input type="password" className='form-control' placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)} />
                    </div>
                    <div class="mb-3"><label className="form-label">Display name </label>
                    <input type="text" placeholder="Display name" className='form-control' id="dsplay-name" onChange={e => setDisplayName(e.target.value)} /></div>
                    <div class="mb-3">  <input type="submit" value="Register" className="btn btn-primary" /></div>
                </form>
            </div>
                    </div>
                    <div class="col">
                        
                    </div>
                </div>
            </div></>
            </>
        );
}
 
export default Register;