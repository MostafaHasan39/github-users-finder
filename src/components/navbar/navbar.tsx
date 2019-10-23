import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../icons/github-icon.png';
import './navbar.css';



const Navigation:React.FC<{}> =()=>{
        return (
            <nav className="nav-bar">
                <ul className="nav-bar-list">
                    <li className="nav-bar-item logo">
                        <img className="nav-logo" src={logo} />
                    </li>
                    <li className="nav-bar-item">
                        <Link to={'/'} className="nav-bar-item-link">
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>
        )
}

export default Navigation;