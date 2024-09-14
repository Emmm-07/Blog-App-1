import { useState } from 'react'
import  axios  from 'axios';
import { useHistory } from 'react-router-dom';
import Modal from './Modal';
import { hostUrl } from "../config";
const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    // const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false)
    const history = useHistory();
    const [modalShow, setModalShow] = useState("none");
    const [modalContent,setModalContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body };
        console.log(blog);
        setIsPending(true);
        const token = localStorage.getItem('access');
        const data = JSON.stringify(blog)

        axios.post(hostUrl + 'api/blogs/',
           data
        ,{
            headers:{
               'Content-Type':"application/json" ,
               'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
            console.log("Done Adding Blog");
            setIsPending(false);
            history.push('/');
        }).catch((error)=>{
           setModalContent(error);
           setModalShow("block")
        })
    

    }
    return (  
        <div className="create">
            <h2>Add a new Blog</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input type="text" 
                required
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                />

                <label>Blog Body:</label>
                <textarea 
                required
                value={body}
                onChange={(e)=> setBody(e.target.value)}
                ></textarea>

                {/* <label>Blog Author:</label> */}
                
                {/* <input
                value={author}
                onChange={(e)=> setAuthor(e.target.value)}
                /> */}
                   
              
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding....</button>}
                <Modal modalContent={modalContent} modalShow={modalShow} setModalShow={setModalShow}/>

            </form>
        </div>
    );
}
 
export default Create;