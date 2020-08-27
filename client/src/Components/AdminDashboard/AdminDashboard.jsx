import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import NavBarAfterLogin from '../NavBarAfterLogin/NavBarAfterLogin';
import {logout} from '../../redux/adminauth/action'
import {Redirect,Link} from 'react-router-dom'
import {fetchAdminItems} from '../../redux/item/action.js'
import Footer from '../Footer/Footer'
import {updateItem,deleteItem} from '../../redux/item/action.js'

export class AdminDashboard extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            update :false,
            price:0,
            id:"",
            initial:false,
            itemupdate:false
        }
    }
    
    componentDidMount(){
        this.props.fetchAdminItems(this.props.logSuccess.token)
        this.setState({
            initial:false
        })
    }

    componentDidUpdate(){
        if(this.state.initial){
        this.props.fetchAdminItems(this.props.logSuccess.token)
        }
        
    }

    

    handleUpdate = (e)=>{
        this.setState({
            update : !this.state.update,
            id : e.target.id,
            initial:false,
            itemupdate:false
        })
    }

    handleUpd = (e)=>{
        this.setState({
            update : !this.state.update,
            initial:true,
            itemupdate:false
        })
        this.props.updateItem(this.state)
    }

    handleChange = (e)=>{
        this.setState({
            price:e.target.value,
            initial:false
        })
    }


    render() {
        if(this.props.logSuccess==""){
            return <Redirect to="/" />
        }
        console.log(this.state)
        const {adminItems} =this.props
        return (
            <div>
                <NavBarAfterLogin />
                <Link to="/additem"><button>Add saree</button></Link>
                {this.state.update?
                        <div>
                            <input type="text"  onChange={this.handleChange} placeholder="price"/>
                            <button  onClick={this.handleUpd}>Update</button>
                        </div>
                        :
                        ""
                        }
                       {this.state.itemupdate? <div>{this.props.update && this.props.update.message}</div>:""}
                    <div className="container">
                    <div class="row p-5">
                        {adminItems && adminItems.map((item,index) =>(
                            <div class="card col-3 " >
                            <img style={{maxHeight:"300px",minHeight:"300px"}} src={item.image} class="card-img-top" alt="..."/>
                            <div class="card-body">
                            <p>Rating: {item.rating}</p>
                            <h5 class="card-title">{item.category} saree</h5>
                            <h5 className="text-success">Rs: {item.price}/-</h5>
                            {/* <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                            <button id={item._id} onClick={this.handleUpdate}>Update</button>
                            <button onClick={()=>{this.props.deleteItem(item._id)}}>Delete</button>
                            </div>
                        </div>
                        ))}
                        
                    </div>
                    </div>
                
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    
        items : state.item.items,
        adminItems : state.item.adminItems,
        logSuccess : state.adminauth.logSuccess,
        update : state.item.update,
        del : state.item.del
})

const mapDispatchToProps = dispatch => {
    return {
        fetchAdminItems: (n) => dispatch(fetchAdminItems(n)),
        updateItem: (n) => dispatch(updateItem(n)),
        deleteItem: (n) => dispatch(deleteItem(n))
      };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
