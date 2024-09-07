import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import show from '../images/show.png';
import hide from '../images/hide.png';
const Signup = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const history = useHistory();
    const [showPass,setShowPass] = useState(true);
    const [passwordStrength,setPasswordStrength] = useState('Weak');

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

    const handlePassword = (e) =>{
       
        setPassword(e.target.value);
        // const regexWeak = /[a-z]/; // Lowercase
        // const regexMedium = /\d|[!@#$%^&*(),.?":{}|<>]/; // Numbers or special characters
        // const regexStrong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/; // Uppercase, lowercase, numbers, special characters

        
        // if (password.length < 8) {
        //     setPasswordStrength('Weak');
        // } else if (password.length >= 8 && regexMedium.test(password)) {
        //     setPasswordStrength('Medium');
        // } else if (password.length >= 10 && regexStrong.test(password)) {
        //     setPasswordStrength('Strong');
        // } else {
        //     setPasswordStrength('Weak');
        // }
        // e.preventDefault();
    }

    return (  
        <div className="signup">
           
            <form onSubmit={handleSignup}>
            <h1>Create new account</h1>
            <p>Already registered? <Link to='/login'>Login</Link></p>
            <label>First Name</label>
                <input type="text" 
                    required
                    value={firstname}
                    onChange={(e)=>setFirstname(e.target.value)}
                    // placeholder="First Name"
                />
                <label>Last Name</label>
                <input type="text" 
                    required
                    value={lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                    // placeholder="Last Name"
                />
                <label>Email</label>
                <input type="email" 
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    // placeholder="Email"
                />
                <label>Username</label>
                <input type="text" 
                    required
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    // placeholder="Username"
                />
                <label>Password</label>
                <input type={showPass?"text":"password" }
                    required
                    value={password}
                    onChange={(e)=>handlePassword(e)}
                />
                <p>Password strength: {passwordStrength}</p>
                
                <br />
                <button>Signup</button>
            </form>
            {/* Hide n' show Password */}
            <img className='passwordIcon' 
                src={showPass?show:hide} 
                onClick={()=>setShowPass(showPass?false:true)}
                style={{opacity:(password==='')?0:1}}
            />

        </div>
    );
}
 
export default Signup;