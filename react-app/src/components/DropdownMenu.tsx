import React from 'react'
import './DropdownMenu.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/actions';
import { IRootState } from '../redux/store';

const DropdownMenu = () => {
    const dispatch = useDispatch();
    const isTutor = useSelector((state: IRootState) => state.auth.isTutor)

    return (
        <div className="user-dropdown-menu">
            <a href="#" className="menu-item">My profile</a>
            {isTutor ? <a href="/instructor" className="menu-item">Instructor Dashboard</a> : ""}
            <a href="#" className="menu-item">My courses</a>
            <a href="#" className="menu-item">Account settings</a>
            <a href="#" className="menu-item">Messages</a>
            <a onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                }} href="#" className="menu-item">Logout</a>
        </div>
        // <div>hello</div>
    )
}

export default DropdownMenu
