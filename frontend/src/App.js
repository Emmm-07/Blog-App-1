import './styles/App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './components/Create';
import Search from './components/Search';
import BlogDetails from './components/BlogDetails';
import NotFound from './components/NotFound'
import Edit from './components/Edit';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
 

  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        
        <div className="content">
          <Switch>
          <Route exact path="/login">
              <Login/>
          </Route>
          <Route exact path="/signup">
              <Signup/>
          </Route>


            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route exact path="/blogs/edit/:id">
              <Edit/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
