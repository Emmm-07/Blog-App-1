import { Route,Redirect } from "react-router-dom";


const PrivateRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem('access');

    return (  
        <Route
            {...rest}
            render = { ({location})=>
                token? (
                    children
                ) : (
                    <Redirect
                        to = {{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
 
export default PrivateRoute;