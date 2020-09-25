import React from 'react'
import './DropdownMenu.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/actions';
import { IRootState } from '../redux/store';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
    const dispatch = useDispatch();
    const isTutor = useSelector((state: IRootState) => state.auth.isTutor)

    return (
        <div className="user-dropdown-menu">
            <Link to="#" className="menu-item">My profile</Link>
            {isTutor ? <Link to="/instructor" className="menu-item">Instructor Dashboard</Link> : ""}
            <Link to="#" className="menu-item">My courses</Link>
            <Link to="#" className="menu-item">Account settings</Link>
            <Link to="#" className="menu-item">Messages</Link>
            <Link onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                }} to="#" className="menu-item">Logout</Link>
        </div>
        // <div>hello</div>
    )
}

export default DropdownMenu
