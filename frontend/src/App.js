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
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';


function App() {
  useEffect(()=>{
    const checkTokenExpiration = () =>{
        var timeNow = new Date(); 
        timeNow = timeNow.getTime();   // time now in millis
        const loginTime = localStorage.getItem('loginTime');
        
        
        if(loginTime && timeNow - loginTime > 20000){
          localStorage.removeItem('access');
          localStorage.removeItem('loginTime');
          console.log("Expireddddddddddddddddd");
          console.log("helllo");
          console.log(loginTime);
          alert("Session expired, Please Log in again")
          return
        }
        console.log(timeNow - loginTime)
    }

    const interval = setInterval(checkTokenExpiration,2000);
    checkTokenExpiration();

    return () => {clearInterval(interval)};

  },[]) 
 



  return (
      <Router>

        <div className="App">
          <div className="content">
            <Switch>
                <Route exact path= "/login">
                    <Login/>
                </Route>
                <Route exact path= "/signup">
                    <Signup/>
                </Route>
                
                <PrivateRoute exact path = "/">
                   <Navbar/>
                    <Home/>
                </PrivateRoute>
                <PrivateRoute exact path="/create">
                    <Navbar/>
                    <Create />
                </PrivateRoute>
                <PrivateRoute exact path="/search">
                    <Navbar/>
                    <Search />
                </PrivateRoute>
                <PrivateRoute exact path="/blogs/:id">
                    <Navbar/>
                    <BlogDetails />
                </PrivateRoute>
                <PrivateRoute exact path="/blogs/edit/:id">
                    <Navbar/>
                    <Edit />
                </PrivateRoute>
                <Route path="*">
                    <Navbar/>
                    <NotFound />
                </Route>
                
            </Switch>
          </div>
        </div>

      </Router>






    // <Router>
    //   <div className="App">
    //     {/* <Navbar /> */}
        
    //     <div className="content">
    //       <Switch>
    //       <Route exact path="/login">
    //           <Login/>
    //       </Route>
    //       <Route exact path="/signup">
    //           <Signup/>
    //       </Route>


    //         <Route exact path="/">
    //           <Home />
    //         </Route>
    //         <Route exact path="/create">
    //           <Create />
    //         </Route>
    //         <Route exact path="/search">
    //           <Search />
    //         </Route>
    //         <Route exact path="/blogs/:id">
    //           <BlogDetails />
    //         </Route>
    //         <Route exact path="/blogs/edit/:id">
    //           <Edit/>
    //         </Route>
    //         <Route path="*">
    //           <NotFound />
    //         </Route>
    //       </Switch>
    //     </div>
    //   </div>
    // </Router>
  );
}

export default App;
