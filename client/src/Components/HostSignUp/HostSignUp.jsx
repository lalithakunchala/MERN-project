import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './HostSignUp.module.css'
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import HostLogin from '../HostLogin/HostLogin';
import {Redirect} from 'react-router-dom'
import {fetchAdminRegister} from '../../redux/adminauth/action'

export class HostSignUp extends Component {

    constructor(props){
        super(props)
        this.state = {
            password:"",
            email:"",
            name:"",
            enter:false
        }
    }
    
    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleClick= ()=>{
        if(this.state.email!==""&& this.state.name!==""&&this.state.password!==""){
            this.props.fetchAdminRegister(this.state)
        }
        else{
            this.setState({
                enter:true
            })
        }
        
    }
    render() {
        return (
            <div>
                <div className={styles.bgWhite}>
                <NavBar />
                </div>
                <div>
                    <div className={styles.cardPadding}>
                        <div className={styles.cardBody}>
                        <div class="card-header" style={{background:"#CA005D"}}>
                        <h3 className={styles.forgot}>Host SignUp</h3>
                        </div>
                        <div class="card text-center" >
                        <div class="card-body">
                            <p class="card-text text-center">Enter Details</p>
                            <input type="text" name="name" placeholder="name" onChange={this.handleChange} className=" p-2 w-100"></input><br/>
                            <input type="text" name="email" placeholder="email" onChange={this.handleChange} className=" p-2 w-100"></input><br/>
                            <input type="text" name="password" placeholder="password" onChange={this.handleChange} className=" p-2 w-100"></input><br/>
                            <button className={styles.btnCss} onClick={this.handleClick}>SignUp</button>
                        </div>
                        {this.state.enter?<div style={{color:'red'}}>Enter all details</div>:""}
                        </div>
                        </div>
                        {!this.props.regSuccess.success?<p>{this.props.regSuccess.message}</p>:
                        <Redirect to="/adminlogin" />
                    }                  
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    regError:state.adminauth.regError,
    regSuccess:state.adminauth.regSuccess
})

const mapDispatchToProps = dispatch=>{
    return {
        fetchAdminRegister: (n) => dispatch(fetchAdminRegister(n))
      };
}

export default connect(mapStateToProps, mapDispatchToProps)(HostSignUp)
