import React, {useState} from 'react'
import axios from 'axios';
import './style.css'
import { useHistory } from "react-router-dom";



const Login = () => {
    const [email,setEmail]=useState('');
    const [pwd,setPwd]=useState('');
    const history = useHistory('');


    const handleSubmit=(e)=>{
        e.preventDefault();
        let user = {email,pwd}
        console.log(user)
            axios.post('http://localhost:4000/api/users/login', user)
            .then(res => {
                console.log(res.data)
                history.push('/');
              })
              .catch(err=>console.log(err,'error'));
        
        
        }
    return (
        <>
         <div class="sign-up">
    <h1 class="fs-1">Login</h1>
    <form onSubmit={handleSubmit}>
        <input type="email"  class="form-control inp" name="email" placeholder="username" onChange={(e)=>setEmail(e.target.value)} /><br />
        <input type="password" class="form-control inp" name="password" placeholder="password" onChange={(e)=>setPwd(e.target.value)} /><br />
        <button type="submit" class="form-control btn">Login</button>
    </form>
</div>
      </>
    )
}

export default Login
