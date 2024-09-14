import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import { hostUrl } from "../config";


const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(hostUrl + 'api/blogs/'+ id );
    const history = useHistory();
    const token = localStorage.getItem('access');
    const [modalShow, setModalShow] = useState("none");
    const [modalContent,setModalContent] = useState("");

    const handleDelete = () => {
        // if(confirm("Are you sure you want to delete this blog?")==true){

            axios.delete(hostUrl + 'api/blogs/'+ id+"/",{
                headers:{
                    'Content-Type':"application/json" ,
                    'Authorization': `Bearer ${token}`
                 }
            }).then((res)=>{
                console.log("Successfully deleted blog");
                history.push('/');
            }).catch(error=>{
               setModalContent(error);
               setModalShow("block");
            })
        //  }
    }
    return (  
        <div className="blog-details">
            {/* { isPending && <div>Loading....</div>} */}
            {isPending &&  <div class="loader"></div> }
            { error && <div>{ error }</div>}
            <Modal modalContent={modalContent} modalShow={modalShow} setModalShow={setModalShow}/>
            { blog && (
                <article>
                    <h2 style={{ color: '#f1356d'}}>{ blog.title }</h2>
                    <i>by { blog.author_first_name } { blog.author_last_name }</i>
                    <br/>
                    <br/>
                    <p>{ blog.body }</p>
                    <br />
                    <p>Date posted: {blog.created_at}</p>   
                    <button><Link to={ `/my_blogs/edit/${id}` } >Edit Blog</Link></button>
                    <button onClick={handleDelete}>Delete Blog</button>

                    
                </article> 
            )}
        
        </div>
    );
}
 
export default BlogDetails;