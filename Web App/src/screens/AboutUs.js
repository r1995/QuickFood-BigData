import React, { Component } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Styles/about.css';

class AboutUs extends Component {

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
                                <div id="about-us" className="clear">
                                    <h2 className="text-center">About Us</h2>
                                    <section id="about-intro">
                                        <img src={require("../assets/images/21679.jpg")} alt="Cover Photo" style={{ width: "100%", height: "20em" }} />
                                        <br />
                                        <br />
                                        <p>In sed neque id libero pretium luctus. Vivamus faucibus. Ut vitae elit. In hac habitasse platea dictumst. Proin et nisl ac orci tempus luctus. Aenean lacinia justo at nisi. Vestibulum sed eros sit amet nisl lobortis commodo. Suspendisse nulla. Vivamus ac lorem. Aliquam pulvinar purus at felis. Quisque convallis nulla id ipsum. Praesent vitae urna. Fusce blandit nunc nec mi. Praesent vestibulum hendrerit ante.</p>
                                        <p>Vivamus accumsan. Donec molestie pede vel urna. Curabitur eget sem ornare felis gravida vestibulum.Sed pulvinar, tellus in venenatis vehicula, lorem magna dignissim erat, in accumsan ante lorem sit amet lorem.</p>
                                    </section>
                                    <br />
                                    <hr />
                                    <section id="team">
                                        <h2 className="text-center">Our Team</h2>
                                        <ul className="clear" style={{ marginLeft: "4em" }}>
                                            <li className="one_third first">
                                                <figure><img src={require("../assets/images/team-member.gif")} alt="" />
                                                    <figcaption>
                                                        <p className="team_name">Sai Jaswanth</p>
                                                        <p className="team_title">Developer</p>
                                                        <p className="team_description">Vestassapede et donec ut est liberos sus et eget sed eget. Quisqueta habitur augue magnisl magna phas ellus sagit titor ant curabi turpis.</p>
                                                    </figcaption>
                                                </figure>
                                            </li>
                                            <li className="one_third">
                                                <figure><img src={require("../assets/images/team-member.gif")} alt="" />
                                                    <figcaption>
                                                        <p className="team_name">Shanu Gupta</p>
                                                        <p className="team_title">Tester</p>
                                                        <p className="team_description">Vestassapede et donec ut est liberos sus et eget sed eget. Quisqueta habitur augue magnisl magna phas ellus sagit titor ant curabi turpis.</p>
                                                    </figcaption>
                                                </figure>
                                            </li>
                                            <li className="one_third">
                                                <figure><img src={require("../assets/images/team-member.gif")} alt="" />
                                                    <figcaption>
                                                        <p className="team_name">Madhu Jyoti</p>
                                                        <p className="team_title">Tester</p>
                                                        <p className="team_description">Vestassapede et donec ut est liberos sus et eget sed eget. Quisqueta habitur augue magnisl magna phas ellus sagit titor ant curabi turpis.</p>
                                                    </figcaption>
                                                </figure>
                                            </li>
                                        </ul>
                                    </section>
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


export default AboutUs;