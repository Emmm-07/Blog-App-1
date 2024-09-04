import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://127.0.0.1:8000/api/blogs/'+ id );
    const history = useHistory();
    const token = localStorage.getItem('access');

    const handleDelete = () => {
        if(confirm("Are you sure you want to delete this blog?")==true){

            axios.delete('http://127.0.0.1:8000/api/blogs/'+ id,{},{
                headers:{
                    'Content-Type':"application/json" ,
                    'Authorization': `Bearer ${token}`
                 }
            }).then((res)=>{
                console.log("Successfully deleted blog");
                history.push('/');
            })
         }
    }
    return (  
        <div className="blog-details">
            { isPending && <div>Loading....</div>}
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h2 style={{ color: '#f1356d'}}>{ blog.title }</h2>
                    <i>by { blog.author_first_name } { blog.author_last_name }</i>
                    <br/>
                    <br/>
                    <p>{ blog.body }</p>
                    <button><Link to={ `/blogs/edit/${id}` } >Edit Blog</Link></button>
                    <button onClick={handleDelete}>Delete Blog</button>
                </article>
            )}
            
        </div>
    );
}
 
export default BlogDetails;