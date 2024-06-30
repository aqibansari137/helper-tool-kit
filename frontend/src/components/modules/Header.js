/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Logo from "../../assets/technical-support.png";
import { NavLink } from "react-router-dom";
import "../styles/Helper.css";
import menuLink from "../../data/navigation.json";

export default class Header extends Component {
  componentDidMount = () => {
    const navLinks = document.querySelectorAll(".nav-item");
    navLinks.forEach((link) => {
      link.addEventListener("click", function handleClick() {
        let navbar = document.querySelector(".navbar-toggler-icon");
        if (window.innerWidth < 992) {
          navbar.click();
        }
      });
    });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              className="me-2"
              width="50px"
              height="50px"
              src={Logo}
              alt="Logo"
            />{" "}
            Helper tool kit
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {menuLink.map((item, i) => {
                if(item.submenu && item.submenu.length > 0) {
                  return <li className="nav-item dropdown" key={i}>
                <a
                  className="nav-link dropdown-toggle"
                  href={item.link}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {item.name}
                </a>
                <ul className="dropdown-menu">
                  {
                    item.submenu.map((subItem,ind)=>{
                      return <li key={ind}>
                      <a className="dropdown-item" href={subItem.link}>
                        {subItem.name}
                      </a>
                    </li>
                    })
                  }
                </ul>
              </li>
                }
                else{

                  return (
                    <li className="nav-item" key={i}>
                    <NavLink to={item.link} className="nav-link">
                      {item.name}
                    </NavLink>
                  </li>
                );
              }
              })}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
