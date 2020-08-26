import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavDropdown, Button, NavbarBrand, } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import {logout} from '../../redux/userauth/action'

export class NavBarUserAfterLogin extends Component {
    
    render() {
      console.log(this.props.loggedUser)
        var {loggedUser} = this.props;
        return (
            <div style={{background:"grey"}}>
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand>
                <div className="himage">
                  <Link to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_9TikrtlcKfqEuofEfewX03tILU1O_JMfOA&usqp=CAU"/></Link>
                </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="ml-auto align-middle">
                  <Link to="/"><button  className="sec btn text-light">Home</button></Link>
                  <Link to="/userdashboard"><button  className="sec btn text-light">{loggedUser}</button></Link>
                    <Link to="/cart"><button  className="sec btn text-light">cart</button></Link>
                    <Link to="/order"><button  className="sec btn text-light">order</button></Link>
                    <Link to="/"><button onClick={()=>this.props.logout()} className="sec btn text-light">Logout</button></Link>
                    
                    <button type="button" className="btn btn-outline-light font-weight-bold"  style={{fontSize:".70em",}}>About Us</button>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedUser : state.userauth.logUser
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarUserAfterLogin)
