import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';


export const ProtectedRoute = (props) => {
    const { Component } = props
    const jwt = Cookies.get('jwtToken');
    if (jwt === undefined) {
        return <Navigate to='/signIn' replace />
    }
    return <Component />
}

export const Authenticated =(props)=>{
    const { Component } = props
    const jwt = Cookies.get('jwtToken');
    if (jwt !== undefined) {
        return <Navigate to='/' replace />
    }
    return <Component />
}
