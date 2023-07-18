/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Logo from "../../assets/technical-support.png"
import { NavLink } from 'react-router-dom'
import "../styles/Helper.css"

export default class Header extends Component {
    componentDidMount = () => {
        const navLinks = document.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', function handleClick() {
                let navbar = document.querySelector(".navbar-toggler-icon");
                if (window.innerWidth < 992) {
                    navbar.click();
                }
            });
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img className='me-2' width="50px" height="50px" src={Logo} alt="Logo" /> Helper tool kit</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'task'} className="nav-link">Task</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'img-comp'} className="nav-link">Compress Image</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'clip-board'} className="nav-link">Clip Board</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'share-file'} className="nav-link">File Sharing</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink to={'code-tip'} className="nav-link">Code Tips</NavLink>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
