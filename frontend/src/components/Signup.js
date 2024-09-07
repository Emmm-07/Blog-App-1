import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const history = useHistory();

    const handleSignup = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/signup',{
            first_name: firstname,
            last_name: lastname,
            username: username,
            email: email,
            password: password,
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.data.access){
                console.log('access:  '+response.data.access);
                localStorage.setItem('access',response.data.access);
                // localStorage.setItem('refresh',response.data.refresh);
                history.push('/login');
            }else {
                alert('Signup failed');
              }
        }).catch(error=>{
            alert(error.response.data.detail.username);
        })
    }

    return (  
        <div className="signup">
           
            <form onSubmit={handleSignup}>
            <h1>Create new account</h1>
            
                <input type="text" 
                    required
                    value={firstname}
                    onChange={(e)=>setFirstname(e.target.value)}
                    placeholder="First Name"
                />
                <input type="text" 
                    required
                    value={lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                    placeholder="Last Name"
                />
                <input type="text" 
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input type="text" 
                    required
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input type="text" 
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button>Signup</button>
            </form>
        </div>
    );
}
 
export default Signup;