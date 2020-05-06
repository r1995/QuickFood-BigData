import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { update_user, remove_user } from '../store/action';
import { update_user, remove_user } from '../ServiceLayer/User';
import { Navbar } from 'react-bootstrap'
// import { logOut, } from '../config/firebase';
import { order_notification } from '../ServiceLayer/Order';


class Navbar2 extends Component {
    constructor() {
        super()
        this.state = {
            homeIconLink: '/'
        }
        this._renderWithLogin = this._renderWithLogin.bind(this);
    }

    async componentDidMount() {
        this.props.update_user();
        if (this.props.user) {
        }
        this.props.order_notification();
    }

    static getDerivedStateFromProps(props) {
        
        if (props.user) {
            if (props.user.isRestaurant) {
                //console.log(props.notification);
                return {
                    
                    my_notification : props.notification,
                    updated_user: props.user,
                    homeIconLink: '/order-requests',
                }
            } else {
                //console.log(props.notification);
                return {
                    my_notification : props.notification,
                    updated_user: props.user,
                }
            }
        } else {
            return {
                updated_user: {
                    isLogin: false,
                }
            }
        }
    }

    handleLogOutBtn() {
        this.props.remove_user()
        // console.log(this.props.history)
        this.props.history.push('/')
    }

    _renderWithOutLogin() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <span className="nav-link active text-uppercase mr-2"><Link to="/restaurants">Restaurants</Link></span>
                </li>
                <li className="nav-item">
                    <span className="nav-link text-uppercase mr-2"><Link to="/login">Login / Register</Link></span>
                </li>
                <li className="nav-item">
                    <Link to="/register-restaurant">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3">Register Restaurant</button>
                    </Link>
                </li>
            </ul>
        )
    }

    _renderWithLogin() {
        const { updated_user } = this.state
        if (updated_user.isRestaurant) {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/add-menu-items">Add Foods</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/my-foods">My Foods</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/order-requests">Order Requests</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        } else {
            return (
               
                <ul className="navbar-nav ml-auto">
                    
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/restaurants">Restaurants</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/my-orders">My Orders</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        }
    }

    render() {
        const { updated_user, homeIconLink, my_notification } = this.state
        console.log(my_notification);
        if(my_notification){
            return (
                // Navbar
                <Navbar variant="dark" expand="lg">
    
                    {/* Brand image */}
                    <Navbar.Brand >
                        <Link className="navbar-brand" to={homeIconLink}>
                            <img alt="Quick Food Logo" src={require("../assets/images/logo.png")} />
                        </Link>
                        
                    </Navbar.Brand>
    
                    <Navbar.Collapse id="notification-bar">
                    <ul style={{marginbottom:'0rem'}} className="navbar-brand" >
                        <li className="nav-item">
                            <span className="nav-link active text-uppercase mr-2">{my_notification.notification}</span>
                        </li>
                    </ul>
                    </Navbar.Collapse>
                    {/* Collapse button */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
                    {/* Navbar Links */}
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        {updated_user.isLogin ? this._renderWithLogin() : this._renderWithOutLogin()}
                    </Navbar.Collapse>
    
                </Navbar>
        );        
        }
        else {
            return (
                // Navbar
                <Navbar variant="dark" expand="lg">
    
                    {/* Brand image */}
                    <Navbar.Brand >
                        <Link className="navbar-brand" to={homeIconLink}>
                            <img alt="Quick Food Logo" src={require("../assets/images/logo.png")} />
                        </Link>
                        
                    </Navbar.Brand>
    
                    <Navbar.Collapse id="notification-bar">
                    <ul style={{marginbottom:'0rem'}} className="navbar-brand" >
                        <li className="nav-item">
                            <span className="nav-link active text-uppercase mr-2"> </span>
                        </li>
                    </ul>
                    </Navbar.Collapse>
                    {/* Collapse button */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
                    {/* Navbar Links */}
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        {updated_user.isLogin ? this._renderWithLogin() : this._renderWithOutLogin()}
                    </Navbar.Collapse>
    
                </Navbar>
        );
        }
        
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        notification: state.notification,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_user: () => dispatch(update_user()),
        remove_user: () => dispatch(remove_user()),
        order_notification: () => dispatch(order_notification()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar2);

