import React from "react";
import notFound from "../../assets/not-found.png";
import "../styles/NotFound.css";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='Not-found-container'>
        <div className='right-col'>
            <img src={notFound} width={500} alt='page not found'/>
        </div>
        <div className='left-col'>
            <h1>PAGE NOT FOUND</h1>
            <p><em>Sorry the page you are looking for doesn't exist or has been removed</em></p>
            <NavLink className="btn-grad" to={"/"}>Back to home</NavLink>
        </div>
    </div>
  );
}
