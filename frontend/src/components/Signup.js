import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import show from '../images/show.png';
import hide from '../images/hide.png';
import Modal from "./Modal";
import { hostUrl } from "../config";
const Signup = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const history = useHistory();
    const [showPass,setShowPass] = useState(true);
    const [passwordStrength,setPasswordStrength] = useState('Weak');
    const [passStrengtColor,setPassStrengtColor]   = useState('red');
    const [isPending, setIsPending] = useState(false);
    const [modalShow, setModalShow] = useState("none");
    const [modalContent,setModalContent] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        setIsPending(true);

        axios.post(hostUrl + 'signup',{
            first_name: firstname,
            last_name: lastname,
            username: username,
            email: email,
            password: password,
        },{
            headers:{
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        }).then(response=>{
            setIsPending(false);
            if(response.data.access){
                console.log('access:  '+response.data.access);
                localStorage.setItem('access',response.data.access);
                // localStorage.setItem('refresh',response.data.refresh);
                history.push('/login');
            }else {
                setModalContent("Signup Failed");
                setModalShow("block")
              }
        }).catch(error=>{
            setIsPending(false);
            setModalContent(error.response.data.detail.username);
            setModalShow("block")
        })
    }

    const handlePassword = (e) =>{
       
        setPassword(e.target.value);
        const regexWeak = /[a-z]/; // Lowercase
        const regexMedium = /(?=.*[a-z])(?=.*\d|[!@#$%^&*(),.?":{}|<>])/; //  contains a lowercase and (Numbers or special characters)
        const regexStrong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/; // contains Uppercase, lowercase, numbers, and special characters
        // const A = /[a-z]/
        // const B = /\d/
        // const C = /[A-Z]/
        // const D = /[!@#$%^&*(),.?":{}|<>]/

        // if(regexStrong.test(password)){
        //     setPasswordStrength('YES');
        // }else{
        //     setPasswordStrength('NO');
        // }
        if (password.length < 6) {
            setPasswordStrength('Weak');    
            setPassStrengtColor('red');
        } else if (regexStrong.test(e.target.value)) {                      // Tests/checks the password
            setPasswordStrength('Strong');
            setPassStrengtColor('green');
        } else if (regexMedium.test(e.target.value)) {
            setPassStrengtColor('yellow');
            setPasswordStrength('Medium');
        } else {
            setPasswordStrength('Weak');
            setPassStrengtColor('red');
        }

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
                <p style={{opacity:(password==='')?0:1}}>Password strength: <span style={{color:passStrengtColor,fontWeight:"bold"}}>{passwordStrength}</span></p>
                
           
                {!isPending && <button>Sign up</button>}
                {isPending && <button disabled>Signing up...</button>}
            </form>
            {/* Hide n' show Password */}
            <img className='passwordIcon' 
                src={showPass?show:hide} 
                onClick={()=>setShowPass(showPass?false:true)}
                style={{opacity:(password==='')?0:1}}
            />

            <Modal modalContent={modalContent} modalShow={modalShow} setModalShow={setModalShow}/>

        </div>
    );
}
 
export default Signup;