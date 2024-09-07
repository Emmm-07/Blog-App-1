import axios from "axios";
import { useState,useEffect } from 'react';
import { useHistory,Link } from 'react-router-dom';
import show from '../images/show.png';
import hide from '../images/hide.png';

const Login = () => {
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const history = useHistory();
    const dateNow = new Date();      
    const [showPass,setShowPass] = useState(true);


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

            try{
                alert(error.response.status===404 && "Invalid credentials");
            }catch(err){
                alert("Network Error, server is offline");
            }

        });

    }

    return (  
      <div className="login">
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <p>Sign in to continue</p>
            <label>Username</label>
            <input type="text" 
                required
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />

            <label>Password</label>
            <input type={showPass?"text":"password" }
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <p><Link>Forgot password?</Link></p>
            <button>Login</button>
            <br />
            <p>Don't have an account yet?<Link to='/signup'> Sign up</Link></p>
        </form>
        <img className='passwordIcon' 
                src={showPass?show:hide} 
                onClick={()=>setShowPass(showPass?false:true)}
                style={{opacity:(password==='')?0:1}}
            />
      </div>
    );
}
 
export default Login;