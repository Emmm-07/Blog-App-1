import { useRef,useState } from "react";
import axios from "axios";
import { hostUrl } from "../config";
import show1 from '../images/show.png';
import hide1 from '../images/hide.png';
import show2 from '../images/show.png';
import hide2 from '../images/hide.png';
import Modal from "./Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ChangePassword = () => {
    const [isPending, setIsPending] = useState(false);
    const [modalShow, setModalShow] = useState("none");
    const [modalContent,setModalContent] = useState("");
    const [error,setError] = useState(null);
    const [newPass1,setNewPass1] = useState("");
    const [newPass2,setNewPass2] = useState("");
    const [showPass1,setShowPass1] = useState(false);
    const [showPass2,setShowPass2] = useState(false);
    const [passwordStrength,setPasswordStrength] = useState('Weak');
    const [passStrengtColor,setPassStrengtColor]   = useState('red');
    const [isPasswordMatch,setIsPasswordMatch]  = useState(null);
    const form = useRef();
    const history = useHistory();

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
    ///EDIT here
    const handleChangePass = (e) => {
        e.preventDefault();
        if(newPass1!=newPass2){
            setIsPasswordMatch(false);
        }else{
            setIsPasswordMatch(true);


            axios.post(hostUrl + 'change_password',{
                newPassword: newPass1,
           },{
               headers:{
                   "Content-Type":'application/json',
                   'Authorization': `Bearer ${localStorage.getItem('account')}`
               }
           }).then(response=>{
               setIsPending(false);
               setError(null);
               console.log("Password changed");
               history.push('/login');
           }).catch(error=>{
               setIsPending(false);
               try{
                   if(error.response.status===404){
                    setError("The email provided does not match any account")
                   }
               }catch(err){
                    setError(error);
               }
    
           });
        }


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
                      
        <Modal modalContent={modalContent} modalShow={modalShow} setModalShow={setModalShow}/>
        </div>
    );
}
 
export default ChangePassword;