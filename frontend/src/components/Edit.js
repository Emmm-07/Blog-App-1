import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Edit = () => {
    const {id} = useParams();
    const [newBody,setnewBody] = useState('');
    const {data: blog, error, isPending} = useFetch('http://127.0.0.1:8000/api/blogs/'+ id);
    const history = useHistory();

    const handleEdit = () => {
        axios.put('http://127.0.0.1:8000/api/blogs/'+ id +'/',
            {   
                title:blog.title,
                author:blog.author,
                body:newBody
            }
        ).then(res=>{
            history.push('/');
        }).catch(error=>alert(error));
    }

     return (  
        <div className="edit">
            {isPending && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {blog && 
                <div>
                    <h2>Edit blog</h2>
                    <br />
                    <h2 style={{ color: '#f1356d'}}>{ blog.title }</h2>
                    <i>by { blog.author }</i>
                    <br/>
                    <br/>
                    <textarea 
                        required
                        value={newBody}
                        onChange={(e)=>setnewBody(e.target.value)}
                    ></textarea>
                    <br />
                    <button onClick={handleEdit}>Update</button>
                </div>
            }
            
            
        </div>
    );
}
 
export default Edit;