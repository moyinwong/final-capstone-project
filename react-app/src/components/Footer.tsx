import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
    let location = useLocation();
    let currentPath = location.pathname;

    if (currentPath.match(/login/) || currentPath.match(/signup/)) {
        return null;
    }

    return (
        <div id="website-footer">
            <img className="footer-logo" src={require("../logo.png")} alt="logo"></img>
            <span>
                Copyright © 2020 Clint Chow, Stanley Lau, Kelvin Wong. All rights reserved
                <Link to="/privacy-policy" style={{color: '#755e33'}}>Privacy Policy</Link>
            </span>

        </div>

    )
}

export default Footer
