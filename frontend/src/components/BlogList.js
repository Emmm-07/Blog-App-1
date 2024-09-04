import { Link } from "react-router-dom";
const BlogList = ({ blogs }) => {  //Props
    
    return (  
        <div className="blog-list">
            <h2>All Blogs</h2>
            <br />
        {blogs.map((blog)=>(
            <div className="blog-preview" key={ blog.id }>
                <Link to = { `/blogs/${blog.id}` }  style={{  textDecoration: 'none'}}>
                    <h3>{ blog.title }</h3>
                    <p>Written by <i>{ blog.author_first_name } { blog.author_last_name }</i></p>
                </Link>
                <br/>
            </div>
        ))}
        </div>
    );
}
 
export default BlogList;