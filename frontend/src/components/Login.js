import axios from "axios";
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const history = useHistory();
    const dateNow = new Date();      

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/login',{
             username: username,
             password: password 
        },{
            headers:{
                "Content-Type":'application/json'
            }
        }).then(response=>{
            if(response.data.access){
                console.log('access:  '+response.data.access);
                localStorage.setItem('access',response.data.access);
                // localStorage.setItem('refresh',response.data.refresh);
                localStorage.setItem('loginTime', dateNow.getTime());    //current time in milliseconds
                
                history.push('/')
            }else{
                alert("login failed");
            }
        }).catch(error=>{
            // alert(error.response.detail);       //Checks only if the 'username' already exists
            alert("Invalid credentials")                                      //Checks only if the 'username' already exists
        });

    }

    return (  
      <div className="login">
        <form onSubmit={handleLogin}>
            <label>Username</label>
            <input type="text" 
                required
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />

            <label>Password</label>
            <input type="text" 
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            
            <button>Login</button>
        </form>
      </div>
    );
}
 
export default Login;