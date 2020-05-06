import React, { Component } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Styles/contact.css';

var CoverPic = require('../assets/images/bg-01.jpg');

class ContactUs extends Component {

    render() {
        return (
            <div>
                <div className="container-fluid res-details-cont1">
                    <div className="">
                        <Navbar2 history={this.props.history} />
                    </div>
                </div>
                <div style={{ background: "#EBEDF3" }} className="container-fluid py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 bg-white p-4">
                                <h2 className="text-center">Contact Us</h2>
                                <div className="container-contact100">
                                    <div className="wrap-contact100">
                                        <div className="contact100-form-title" style={{ backgroundImage: "url(" + CoverPic + ")" }}>
                                            <span className="contact100-form-title-1">
                                                Contact us
                                                </span>
                                            <span className="contact100-form-title-2">
                                                Feel free to drop us a line below!
                                                </span>
                                        </div>
                                        <form className="contact100-form validate-form">
                                            <div className="wrap-input100 validate-input" data-validate="Name is required">
                                                <span className="label-input100">Full Name:</span>
                                                <input className="form-control" type="text" name="name" placeholder="Enter full name" />
                                                <span className="focus-input100"></span>
                                            </div>

                                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                                <span className="label-input100">Email:</span>
                                                <input className="form-control" type="text" name="email" placeholder="Enter email addess" />
                                                <span className="focus-input100"></span>
                                            </div>

                                            <div className="wrap-input100 validate-input" data-validate="Phone is required">
                                                <span className="label-input100">Phone:</span>
                                                <input className="form-control" type="text" name="phone" placeholder="Enter phone number" />
                                                <span className="focus-input100"></span>
                                            </div>

                                            <div className="wrap-input100 validate-input" data-validate="Message is required">
                                                <span className="label-input100">Message:</span>
                                                <textarea className="form-control" rows="4" name="message" placeholder="Your Comment..."></textarea>
                                                <span className="focus-input100"></span>
                                            </div>

                                            <div>
                                                <button className="btn btn-sm btn-success">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}


export default ContactUs;