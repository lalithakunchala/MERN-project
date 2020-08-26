import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './UserSignUp.module.css'
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import UserLogin from '../UserLogin/UserLogin';
import {Redirect} from 'react-router-dom'
import {fetchUserRegister} from '../../redux/userauth/action'

export class UserSignUp extends Component {

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
            this.props.fetchUserRegister(this.state)
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
                        <h3 className={styles.forgot}>User SignUp</h3>
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
                        <Redirect to="/userlogin" />
                    }                  
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    regError:state.userauth.regError,
    regSuccess:state.userauth.regSuccess
})

const mapDispatchToProps = dispatch=>{
    return {
        fetchUserRegister: (n) => dispatch(fetchUserRegister(n))
      };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUp)
