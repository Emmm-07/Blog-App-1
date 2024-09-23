import useFetch from "./useFetch";
import BlogList from "./BlogList";
import { hostUrl } from "../config";
import unheartedIcon from "../images/unheart.png" 
import heartedIcon from "../images/heart.png"
import commentsIcon from "../images/comments.png"
import { useState,useEffect } from "react";
import axios from "axios";

const Posts = () => {
    const { data: blogs, isPending, error } = useFetch(hostUrl + 'api/blogs/other_blogs');
    const { data:hearted_blogs , isPending: isPending2, error:error2} = useFetch(hostUrl + 'hearted_blogs');
    const [heartedBlogs,setHeartedBlogs] = useState({});
    const token = localStorage.getItem('access');
    const [heartCounts,setHeartCounts] = useState({});

      // Effect to set hearted blogs based on fetched data
      useEffect(() => {
        if (hearted_blogs && hearted_blogs.heartedBlogId) {
            const initialHeartedBlogs = {};
            hearted_blogs.heartedBlogId.forEach(blogId => {
                initialHeartedBlogs[blogId] = true; // Mark as hearted (this is a dictionary/object)
            });
            console.log("Hello")
            console.log(initialHeartedBlogs)
            setHeartedBlogs(initialHeartedBlogs); // Set hearted blogs state
        }
    }, [hearted_blogs]); // Only run when hearte

    useEffect(()=>{
        if(blogs){
            const inittialHeartCounts = {}
            blogs.forEach(blog=>{
                inittialHeartCounts[blog.id] = blog.total_hearts;
            })
            setHeartCounts(inittialHeartCounts);
        }
    },[blogs])

    const postHeart = (blogId) =>{                          // Retrieve blog IDs that you have hearted
        axios.post(hostUrl + 'toggle_heart',{
            blogId:blogId,
        },{
            headers:{
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
            }
        }).then(res=>{
                console.log("successful reacting");
        }).catch(error=>{
            console.log(error);
        })
    }

    const toggleHeart = (blogId) => {
        setHeartedBlogs((prevState)=>({
            ...prevState,
            [blogId] : !prevState[blogId],     // Toggle hearted state for the specific blog

        }))

        setHeartCounts((prevState)=>({
            ...prevState,
            [blogId] : prevState[blogId] + (heartedBlogs[blogId] ? -1 : 1)
        }))
        postHeart(blogId);
    }
    
    return (  
        <div className="posts">
            {/* {hearted_blogs && console.log(hearted_blogs.heartedBlogId)} */}
            {console.log(heartedBlogs)}
            {/* {hearted_blogs && 
                hearted_blogs.heartedBlogId.map((blogId)=>{
                    toggleHeart(blogId);
                })
            } */}
            <h2>Latest Posts</h2>
            <br />
            {error && <div style={{ color:'red',fontSize:'50px' }}>{ error }</div>}
            {/* {isPending && <div>Loading.... (Fetching Data from the database)</div>} */}
            {isPending &&  <div class="loader"></div> }
            {blogs && hearted_blogs &&

                blogs.map((blog)=>(                               // Slice to get only the first 3 blogs
                    <article className="blog-preview" key={blog.id}>
                    <h2 style={{ color: '#f1356d'}}>{ blog.title }</h2>
                    <i>by { blog.author_first_name } { blog.author_last_name }</i>
                    <br/>
                    <br/>
                    <p>{ blog.body }</p>
                    <br />
                    <p>Date posted: {blog.created_at}</p>
                    {/* {hearted_blogs.heartedBlogId.includes(blog.id) && (() => toggleHeart(blog.id))} */}
                    {heartCounts[blog.id]!=0 && heartCounts[blog.id]}
                    <img src={heartedBlogs[blog.id]?heartedIcon:unheartedIcon} 
                        alt="heart.png" 
                        className="heartIcon" 
                        onClick={()=>toggleHeart(blog.id)}/>
                        
                    <img src={commentsIcon} alt="comments.png" className="commentsIcon"/>
    
                    </article>
                ))
                
            }              
        </div>
    );
}
 
export default Posts;