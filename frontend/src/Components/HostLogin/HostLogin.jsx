import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './HostLogin.module.css'
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import {Redirect} from 'react-router-dom';
import {fetchAdminLogin,logout} from '../../redux/adminauth/action'

export class HostLogin extends Component {

    constructor(props){
        super(props)
        this.state = {
            password:"",
            email:"",
            enter:false
        }
    }
    
    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleClick = ()=>{
        if(this.state.email!==""&& this.state.password!==""){
            
            this.props.fetchAdminLogin(this.state)
        }
        else{
            this.setState({
                enter:true
            })
        }
        
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div className={styles.bgWhite}>
                <NavBar />
                </div>
                <div>
                    <div className={styles.cardPadding}>
                        <div className={styles.cardBody}>
                        <div class="card-header" style={{background:"#CA005D"}}>
                        <h3 className={styles.forgot}>Host Login</h3>
                        </div>
                        <div class="card text-center" >
                        <div class="card-body">
                            <p class="card-text text-center">Enter Details</p>
                            <input type="text" placeholder="email" name="email" onChange={this.handleChange} className=" p-2 w-100"></input><br/>
                            <input type="text" placeholder="password" name="password" onChange={this.handleChange} className=" p-2 w-100"></input><br/>
                            <button className={styles.btnCss} onClick={this.handleClick}>Login</button>
                        </div>
                        {this.state.enter?<div style={{color:'red'}}>Enter all details</div>:""}
                        </div>
                        </div>
                        :
                        {!this.props.logSuccess.succes?<p>{this.props.logSuccess.message}</p>:
                        <Redirect to="/adminDashboard" />
                    }                  
                                     
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    logSuccess : state.adminauth.logSuccess,
    logUser : state.adminauth.logSuccess
})

const mapDispatchToProps = dispatch=>{
    return {
        logout: ()=>dispatch(logout()),
        fetchAdminLogin: (n) => dispatch(fetchAdminLogin(n))
      };
}
export default connect(mapStateToProps, mapDispatchToProps)(HostLogin)
