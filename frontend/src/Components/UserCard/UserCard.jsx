import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom';

export class UserCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    
    render() {
        return (
            
                <div class="card col-3 " >
                        <img style={{maxHeight:"300px",minHeight:"300px"}} src={this.props.image} class="card-img-top" alt="..."/>
                        <div class="card-body">
                        <p>Rating: {this.props.rating}</p>
                        <h5 class="card-title">{this.props.category} saree</h5>
                        <h5 className="text-success">Rs: {this.props.price}/-</h5>
                        {/* <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                        {this.props.loggedUser?<button onClick={this.handleCart}>Add to cart</button>:""}
                        </div>
                    </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    loggedUser : state.userauth.logUser
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard)
