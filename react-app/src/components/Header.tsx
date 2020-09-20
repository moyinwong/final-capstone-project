import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { logout } from '../redux/auth/actions';
import { push } from 'connected-react-router';

const Header = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
      (state: IRootState) => state.auth.isAuthenticated
    );
    const userEmail = useSelector((state: IRootState) => state.auth.email);
    
    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <div> Welcome back {userEmail}</div>
                    <button onClick={() => {
                        localStorage.removeItem('token')
                        dispatch(logout())
                    }}>Logout</button>
                </div>
            ) : (
                    <button onClick={() => dispatch(push("/login"))}>Login</button>
            )}
        </div>
    )
}

export default Header
