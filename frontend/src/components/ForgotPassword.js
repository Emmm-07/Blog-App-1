import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { useRef,useState } from "react";
import axios from "axios";
import { hostUrl } from "../config";

const ForgotPassword = () => {
    const form = useRef();
    const [email,setEmail] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error,setError] = useState(null);


    const checkEmail = (e) =>{
        e.preventDefault();
        setIsPending(true); 

        axios.post(hostUrl + 'check_email',{
            email: email,
       },{
           headers:{
               "Content-Type":'application/json'
           }
       }).then(response=>{
           localStorage.setItem("account",response.data.account);
           setIsPending(false);
           setError(null);
           sendEmail();
           console.log("Email Verified");

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

    const sendEmail = (e) => {
        // e.preventDefault();
        
        const YOUR_SERVICE_ID = 'service_54raegp';
        const YOUR_TEMPLATE_ID = 'template_bz8l1uk';
        const YOUR_PUBLIC_KEY = 'WS7GaA2MhJS9Z7p1h';
        const currentForm = form.current;
        currentForm.link.value  = hostUrl + 'change_password';

        console.log(form.current)
        emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, currentForm, {
            publicKey: YOUR_PUBLIC_KEY,
          }).then(
            () => {
              form.current.reset();
              alert("email sent");
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      };



    return (  
        <div className="forgot_password">
            {isPending && <div><div class="loader"></div><h2>Verifying email</h2></div>}
            { error && <div>{ error }</div>}
  
            <form ref={form} onSubmit={checkEmail}>
            <h1>Forgot Password</h1>
            <p>Enter your email to reset password</p>
            <br />
            <label>Email</label>
            <input type="email"  
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
            />  
            
            <input type="hidden" name="link" value=""></input>

            <button>Send</button>
            <br />
            <p>Create new account instead?<Link to='/signup'>Signup</Link> </p>
        
        </form>
       
        </div>
    );
}
 
export default ForgotPassword;