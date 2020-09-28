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
            <Link to="#" className="menu-item">我的帳戶</Link>
            {isTutor ? <Link to="/instructor" className="menu-item">老師介面</Link> : ""}
            <Link to="#" className="menu-item">我的課程</Link>
            <Link to="#" className="menu-item">收件箱</Link>
            <Link onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                }} to="#" className="menu-item">登出</Link>
        </div>
        // <div>hello</div>
    )
}

export default DropdownMenu
