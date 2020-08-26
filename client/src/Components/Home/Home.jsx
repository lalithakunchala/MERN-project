import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import NavBar from '../Navbar/NavBar.jsx';
import NavBarUserAfterLogin from '../NavBarUserAfterLogin/NavBarUserAfterLogin';
import styles from './Home.module.css'
import Footer from '../Footer/Footer'
import {fetchItems,filter} from '../../redux/item/action.js' 
import UserCard from '../UserCard/UserCard.jsx'

export class Home extends PureComponent {

    constructor(props){
        super(props)
        this.state ={
            page:1,
            ratingFilter:0,
            costForFilter:0,
            categoryFilter:"all",
            initial: true,
            cat:false
        }
    }

    componentDidMount(){
        this.props.fetchItems(this.state.page)
    }

    

    handleChange = (e)=>{
        console.log(e.target.value)
        if(e.target.value=="all"){
            console.log("all")
            this.setState({
                categoryFilter:"silk"||"cotton"||"fancy",
                cat : false
            }) 
        }
        else{
            console.log("diff")
        this.setState({
            categoryFilter:e.target.value,
            cat:true
        })
    }
    }

    handlePage = (e)=>{
        console.log(e.target.id)
        console.log()
        if(e.target.id==="prev" ){
            if(this.state.page>1){
                this.setState({page:this.state.page-1})
                this.props.fetchItems(this.state.page-1)
            }  
            
        }
        else if(e.target.id==="next"){
            if(true){
                this.setState({page:this.state.page+1})
                this.props.fetchItems(this.state.page+1)
            } 
        }
        else{
            this.setState({
                page:Number(e.target.value)
            })
            this.props.fetchItems(Number(e.target.value))
        }
        
    }

    
      handleRatingChange = rating=>{
        this.setState({
          ratingFilter:rating
        })
      }
    
      handleSort = order=>{
          console.log(order)
        this.setState({
          costForFilter:order
        })
      }


    render() { 
        var {ratingFilter,categoryFilter,costForFilter} = this.state
        var {items} = this.props

        return (
            <div>
                {!this.props.loggedUser?<NavBar />:<NavBarUserAfterLogin />}
                
                <div className={styles.height_img}>
                    <div style={{paddingTop:"200px",paddingRight:"1100px"}}>
                    <h1 className=" text-light justify-content-bottom  fnt"><span className={styles.fnt}>Trendy &<br/>Latest Designs</span></h1>
                    </div>
                </div> 
                <div className="container">

                <div style={{float:"right",flexDirection:"row",marginLeft:40}}>
            {/* {" "}
            Rating{[5,4,3,2].map(rating=>(
              <button onClick={()=>this.handleRatingChange(rating)}style={{padding:10}}>{rating}</button>
            )
            )} */}
          </div>

          <div style={{float:"right",flexDirection:"row",marginLeft:40}}>
            {" "}
              Price-Order:{["low-high","high-low"].map(order=>(
                <button onClick={()=>this.handleSort(order)}style={{padding:10}}>{order}</button>
              )
              )}
            
            </div>
                <div>
                <form className="form-inline">
                        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Category</label>
                        <select name="category" onChange={this.handleChange} className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                        <option value="all">All</option>
                        <option value="cotton">Cotton</option>
                        <option value="fancy">Fancy</option>
                        <option value="silk">Silk</option>
                        </select>
                        <button onClick={this.handleClick} type="submit" className="btn btn-light text-light my-1">Submit</button>
                    </form> 
                    </div>
                    <div class="row p-5">
                    {items && items.filter(({rating,category})=>{
                         if(!this.state.cat){
                              return rating>=ratingFilter 
                         }
                         if(this.state.cat){
                             return rating>=ratingFilter && category==categoryFilter
                         }
                        }).sort((a,b)=>{
                            
                            if(costForFilter===null){
                            return 0;
                            }
                            if(costForFilter==='low-high'){
                            return a.price-b.price;
                            }
                            if(costForFilter==='high-low'){
                            return b.price-a.price;
                            }
                            
                        })
                            .map(item =>(
                            <UserCard image = {item.image} price={item.price} rating={item.rating} category={item.category}/>
                    ))}
            
                </div>

                </div>
                <nav aria-label="...">
                    <ul className="pagination float-right">
                    <button  id="prev" onClick={this.handlePage}>prev</button>
                        <button id={this.state.page} onClick={this.handlePage}>{this.state.page}</button>   
                    <button  id="next" onClick={this.handlePage}>next</button>
                    </ul>
                </nav>
                <Footer /> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
    items : state.item.items,
    loggedUser : state.userauth.logUser || state.adminauth.logUser,
    filterdata: state.item.filterdata
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: (n) => dispatch(fetchItems(n)),
        filter: (n)=>dispatch(filter(n))
      };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
