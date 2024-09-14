import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState,useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";
import { hostUrl } from "../config";

const Edit = () => {
    const {id} = useParams();
    const [newBody,setNewBody] = useState('');
    const {data: blog, error, isPending} = useFetch(hostUrl + 'api/blogs/'+ id);
    const history = useHistory();
    const textAreaRef = useRef();
    const token = localStorage.getItem('access');
    const [modalShow, setModalShow] = useState("none");
    const [modalContent,setModalContent] = useState("");


    useEffect(() => {
        if (blog) {
            setNewBody(blog.body);
        }
        if (textAreaRef.current){
            textAreaRef.current.focus();
        }
    }, [blog]);

    const handleEdit = () => {
        // if (confirm("This will update the contents of the blog")==true){
            axios.put(hostUrl + 'api/blogs/'+ id +'/',
                {   
                    title:blog.title,
                    body:newBody,

                },
                {
                    headers:{
                        'Content-Type':"application/json" ,
                        'Authorization': `Bearer ${token}`
                     }
                }
            ).then(res=>{
                history.push('/');
            }).catch(error=>{
                setModalContent(error);
                setModalShow("block")
            });
        // }
    }

     return (  
        <div className="edit">
             {isPending &&  <div class="loader"></div> }
            {error && <div>{ error }</div>}
            {blog && 
                <div>
                    <h2>Edit Blog Content</h2>
                    <br />
                    <h2 style={{ color: '#f1356d'}}>{ blog.title }</h2>
                    <i>by { blog.author }</i>
                    <br/>
                    <br/>
                    <textarea   
                        required
                        ref={textAreaRef}
                        value={newBody}
                        onChange={(e)=>setNewBody(e.target.value)}
                    ></textarea>
                    <br />
                    <button onClick={handleEdit}>Save</button>
                </div>
            }
            
            <Modal modalContent={modalContent} modalShow={modalShow} setModalShow={setModalShow}/>
        </div>
    );
}
 
export default Edit;