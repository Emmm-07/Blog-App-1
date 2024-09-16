import { useRef,useState } from "react";
import axios from "axios";
import { hostUrl } from "../config";
import show1 from '../images/show.png';
import hide1 from '../images/hide.png';
import show2 from '../images/show.png';
import hide2 from '../images/hide.png';

const ChangePassword = () => {
    const [isPending, setIsPending] = useState(false);
    const [error,setError] = useState(null);
    const [newPass1,setNewPass1] = useState("");
    const [newPass2,setNewPass2] = useState("");
    const [showPass1,setShowPass1] = useState(true);
    const [showPass2,setShowPass2] = useState(true);
    const [passwordStrength,setPasswordStrength] = useState('Weak');
    const [passStrengtColor,setPassStrengtColor]   = useState('red');
    const form = useRef();

    const handlePassword = (e) =>{
       
        setNewPass1(e.target.value);
        const regexWeak = /[a-z]/; // Lowercase
        const regexMedium = /(?=.*[a-z])(?=.*\d|[!@#$%^&*(),.?":{}|<>])/; //  contains a lowercase and (Numbers or special characters)
        const regexStrong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/; // contains Uppercase, lowercase, numbers, and special characters


        if (newPass1.length < 6) {
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

    const handleChangePass = (e) => {
        e.preventDefault();
    }; 

    return (  
        <div className="change_password">
            {isPending && <div class="loader"></div>}
            { error && <div>{ error }</div>}
  
            <form ref={form} onSubmit={handleChangePass}>
            <h1>Change Password</h1>

            <br />
            <label>New Password</label>
            <input type={showPass1?"text":"password"}  
                name="newPass1"
                value={newPass1}
                onChange={(e)=>handlePassword(e)}
                required
            />  
            <label>Confirm Password</label>
            <input type={showPass2?"text":"password"}  
                name="newPass2"
                value={newPass2}
                onChange={(e)=>setNewPass2(e.target.value)}
                required
            />  

            <p style={{opacity:(newPass1==='')?0:1}}>Password strength: <span style={{color:passStrengtColor,fontWeight:"bold"}}>{passwordStrength}</span></p>

            <br />
            <button>Save</button>
         
 
        </form>

        <img className='passwordIcon' 
                src={showPass1?show1:hide1} 
                onClick={()=>setShowPass1(showPass1?false:true)}
                style={{opacity:(newPass1==='')?0:1}}
            />
        <img className='passwordIcon' 
                src={showPass2?show2:hide2} 
                onClick={()=>setShowPass2(showPass2?false:true)}
                style={{opacity:(newPass2==='')?0:1}}
            />  
        </div>
    );
}
 
export default ChangePassword;