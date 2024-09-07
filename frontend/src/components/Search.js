import useFetch from "./useFetch";
import BlogList from "./BlogList";
const Search = () => {
    const { data: blogs, isPending, error } = useFetch('http://127.0.0.1:8000/api/blogs');
    return (  
        <div className="search">
            <h2>Latest Posts</h2>
            <br />
            {error && <div style={{ color:'red',fontSize:'50px' }}>{ error }</div>}
            {isPending && <div>Loading.... (Fetching Data from the database)</div>}
            {blogs && 

                blogs.slice(0,3).map((blog)=>(                               // Slice to get only the first 3 blogs
                    <article className="blog-preview">
                    <h2 style={{ color: '#f1356d'}}>{ blog.title }</h2>
                    <i>by { blog.author_first_name } { blog.author_last_name }</i>
                    <br/>
                    <br/>
                    <p>{ blog.body }</p>
                    <br />
                    <p>Date posted: {blog.created_at}</p>
                    </article>
                ))
                
            }              
        </div>
    );
}
 
export default Search;