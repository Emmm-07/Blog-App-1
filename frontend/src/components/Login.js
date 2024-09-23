import axios from "axios";
import { useState,useEffect } from 'react';
import { useHistory,Link } from 'react-router-dom';
import show from '../images/show.png';
import hide from '../images/hide.png';
import Modal from "./Modal";
import { hostUrl } from "../config";

const Login = () => {
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const history = useHistory();
    const dateNow = new Date();      
    const [showPass,setShowPass] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [modalShow, setModalShow] = useState("none");
    const [modalContent,setModalContent] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setIsPending(true); 
        axios.post(hostUrl + 'login',{
             username: username,
             password: password 
        },{
            headers:{
                "Content-Type":'application/json'
            }
        }).then(response=>{
            setIsPending(false);
            if(response.data.access){
                console.log('access:  '+response.data.access);
                localStorage.setItem('access',response.data.access);
                // localStorage.setItem('refresh',response.data.refresh);
                localStorage.setItem('loginTime', dateNow.getTime());    //current time in milliseconds
                
                history.push('/')
            }else{
                setModalContent("login failed");
            }
            setModalShow("block");
        }).catch(error=>{
            setIsPending(false);
            try{
                
                setModalContent(error.response.status===404 && "Invalid username or password");
            }catch(err){
                setModalContent("Network Error, server is offline");
            }
            setModalShow("block");
        });

    }

    return (  
      <div className="login">
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <p>Sign in to continue</p>
            <label>Username</label>
            <input type="text" 
                autoFocus
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
            <p><Link to='/forgot_password'>Forgot password?</Link></p>
            {!isPending && <button>Login</button>}
            {isPending && <button disabled>Logging in...</button>}
            <br />
            <p>Don't have an account yet?<Link to='/signup'> Sign up</Link></p>
        </form>
        <img className='passwordIcon' 
                src={showPass?show:hide} 
                onClick={()=>setShowPass(showPass?false:true)}
                style={{opacity:(password==='')?0:1}}
            />
            
          
     <Modal modalContent={modalContent} modalShow={modalShow} setModalShow={setModalShow}/>

      </div>
    );
}
 
export default Login;