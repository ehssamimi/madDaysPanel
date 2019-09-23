import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faStroopwafel,faCoffee,faHome,faChartArea,faUser,faGamepad} from "@fortawesome/free-solid-svg-icons";
import {connect } from 'react-redux';
import {ClickOnDrawer} from "../actions";
import Home from "./Home/Home";
import Menu from "./Chart/Menu";
import Menu1 from "./Chart/Menu1";
import Menu2 from "./Chart/Menu2";
import Users from "./UserManagment/Users";
import Gamemanager from "./GameManager/Gamemanager";

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state={
            expanded:false
        }
    }


    render() {
        console.log(this.state.expanded);
        let {clickOnRightDrawer}=this.props;
        clickOnRightDrawer(this.state.expanded);
        return (
            <div>
                <div className="App">
                    <Router>
                        <Route render={({ location, history }) => (
                            <React.Fragment>

                                <SideNav
                                    onSelect={(selected) => {
                                        const to = '/' + selected;
                                        if (location.pathname !== to) {
                                            history.push(to);
                                        }
                                    }}
                                    expanded={this.state.expanded}
                                    onToggle={(expanded) => {
                                        this.setState({ expanded });
                                    }}
                                >
                                    <SideNav.Toggle />
                                    <SideNav.Nav defaultSelected="home">
                                        <NavItem eventKey="">
                                            <NavIcon>
                                                <FontAwesomeIcon icon="home"  className="fa fa-fw " style={{ fontSize: '1.75em' }} />
                                                {/*<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />*/}
                                            </NavIcon>
                                            <NavText>
                                                Home
                                            </NavText>
                                        </NavItem>
                                        <NavItem eventKey="users">
                                            <NavIcon>
                                                <FontAwesomeIcon icon="user"  className="fa fa-fw  " style={{ fontSize: '1.75em' }} />
                                                {/*<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />*/}
                                            </NavIcon>
                                            <NavText>
                                                Users
                                            </NavText>
                                        </NavItem>

                                        <NavItem eventKey="gamemanager">
                                            <NavIcon>
                                                <FontAwesomeIcon icon="gamepad"  className="fa fa-fw  " style={{ fontSize: '1.75em' }} />
                                                {/*<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />*/}
                                            </NavIcon>
                                            <NavText>
                                                Game
                                            </NavText>
                                        </NavItem>
                                        <NavItem eventKey="menu">
                                            <NavIcon>
                                                <FontAwesomeIcon icon="chart-area" className="fa fa-fw " style={{ fontSize: '1.75em' }} />
                                            </NavIcon>
                                            <NavText>
                                                Chart
                                            </NavText>
                                            <NavText>Charts</NavText>
                                            <NavItem eventKey="menu/1">
                                                <NavText>Line Chart</NavText>
                                            </NavItem>
                                            <NavItem eventKey="menu/2">
                                                <NavText>Bar Chart</NavText>
                                            </NavItem>
                                        </NavItem>


                                    </SideNav.Nav>
                                </SideNav>
                                <main>
                                    <Route path="/" exact={true} component={Home}/>
                                    <Route path="/menu" exact={true} component={Menu}/>
                                    <Route path="/users" exact={true} component={Users}/>
                                    <Route path="/gamemanager" exact={true} component={Gamemanager}/>
                                    <Route path="/Menu/1" exact={true} component={Menu1}/>
                                    <Route path="/Menu/2" exact={true} component={Menu2}/>

                                </main>
                            </React.Fragment>
                        )}
                        />
                    </Router>

                </div>
            </div>
        );
    }
}
const MapDispatchToprops=dispatch=>({
    clickOnRightDrawer:info=>dispatch(ClickOnDrawer(info))
})

export default connect(null,MapDispatchToprops)(LeftMenu);