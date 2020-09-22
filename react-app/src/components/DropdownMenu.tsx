import React from 'react'
import './DropdownMenu.scss'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/actions';

const DropdownMenu = () => {
    const dispatch = useDispatch();
    return (
        <div className="user-dropdown-menu">
            <a href="#" className="menu-item">My Profile</a>
            <a href="#" className="menu-item">My courses</a>
            <a href="#" className="menu-item">Account settings</a>
            <a href="#" className="menu-item">Messages</a>
            <a onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                }} href="#" className="menu-item">Logout</a>
        </div>
    )
}

export default DropdownMenu
