import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button, NavbarBrand, } from 'react-bootstrap';
import  "./Navbar.css";

export class NavBar extends Component {
    render() {
        return (
            <div style={{background:"lightgrey"}}>
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand>
                <div className="himage">
                  <Link to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_9TikrtlcKfqEuofEfewX03tILU1O_JMfOA&usqp=CAU"/></Link>
                </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="ml-auto align-middle">
                    <NavDropdown title="sign up" className="sec" id="collasible-nav-dropdown">
                    <Link to="/user"><NavDropdown.Item href="#registermodal" data-toggle="modal">User Signup</NavDropdown.Item></Link>
                    <Link to="/host"><NavDropdown.Item href="#registermodal" data-toggle="modal">Host Signup</NavDropdown.Item></Link>
                    </NavDropdown>
                    <NavDropdown title="log in" className="sec" id="collasible-nav-dropdown">
                    <Link to="/userlogin"><NavDropdown.Item href="#loginmodal" data-toggle="modal" data-target="#loginmodal">User Login</NavDropdown.Item></Link>
                    <Link to="/hostlogin"><NavDropdown.Item href="#loginmodal" data-toggle="modal" data-target="#loginmodal">Host Login</NavDropdown.Item></Link>
                    </NavDropdown>
                    <NavDropdown title="help" className="sec" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Delivery</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Cash Payment</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Exchange</NavDropdown.Item>
                    </NavDropdown>
                    <button type="button" className="btn btn-outline-light font-weight-bold"  style={{fontSize:".70em",}}>About Us</button>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
</div>
            )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
