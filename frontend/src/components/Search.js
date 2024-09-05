import useFetch from "./useFetch";
import BlogList from "./BlogList";
const Search = () => {
    const { data: blogs, isPending, error } = useFetch('http://127.0.0.1:8000/api/blogs');
    return (  
        <div className="search">
            <h2>Search</h2>
            <br />
            {error && <div style={{ color:'red',fontSize:'50px' }}>{ error }</div>}
            {isPending && <div>Loading.... (Fetching Data from the database)</div>}
            {blogs && <BlogList blogs={blogs}  /> }              
        </div>
    );
}
 
export default Search;