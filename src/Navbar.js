import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

export default class Navbar extends Component{
    render(){
        return(
            <>
            <div className="navbar p-3">
                <NavLink className="navbar-brand" to="/">Home</NavLink>
                <NavLink className="nav-link"  to="/animationMovies"> Animation Movies</NavLink>
                <NavLink className="nav-link"  to="/disneyMovies"> Walt Disney Movies</NavLink>
            </div>
           
            </>
        )
    }
} 