import '../styles/index.css'
import { Link } from 'react-router-dom';
// shortcut: 'sfc' then TAB
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Jm's First React App</h1>
            <div className="links">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create</Link></li>
                    <li><Link to="/about">About</Link></li>
                    
                </ul>
               
                
            </div>
     
        </nav>
    );
}
 
export default Navbar;