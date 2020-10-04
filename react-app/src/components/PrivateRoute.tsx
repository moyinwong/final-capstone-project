import React from 'react'
import { RouteProps, Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }: RouteProps) => {

    const isAuthenticated = localStorage.getItem('token');
    const Component = component;
    if (Component == null) {
        return null;
    }

    let render:(props:any)=>JSX.Element 

    if(isAuthenticated){
        render = (props:any)=>(
            <Component {...props} />
        )    
    }else{
        render = (props:any)=>(
            <Redirect to={ {
                pathname: '/login',
                state: { from: props.location }
            } } />
        )
    }

    return <Route {...rest} render={render}/>   
}

export default PrivateRoute
