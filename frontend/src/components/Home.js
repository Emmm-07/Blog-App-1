// shortcut: 'sfc' then TAB
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import { hostUrl } from "../config";

const Home = () => {
    // const handleDelete = (id) => {
    //     const newBlogList =  blogs.filter((blog)=>blog.id !== id);
    //     setBlogs(newBlogList);
    // }

    const { data: blogs, isPending, error } = useFetch(hostUrl + 'api/blogs/my_blogs');
   
        
   

    return( 
        
        <div className="homepage">
        {error && <div style={{ color:'red',fontSize:'50px' }}>{ error }</div>}
        {/* {isPending && <div>Loading.... (Fetching Data from the database)</div>} */}
        {isPending &&  <div class="loader"></div> }
        {blogs && <BlogList blogs={blogs} /*handleDelete={handleDelete}*/ /> }              
            

        </div>
        //BlogList component will only be called if blogs is not null
    );


}
 
export default Home;