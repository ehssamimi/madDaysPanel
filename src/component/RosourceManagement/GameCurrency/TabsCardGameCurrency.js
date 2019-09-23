import React, {Component} from 'react';
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    Nav,
    NavItem,
    TabContent,
    TabPane
} from "reactstrap";
import { NavLink } from "react-router-dom";

import classnames from "classnames";
import IntlMessages from "./../../../helpers/IntlMessages";
import {Colxx} from "../../../components/common/CustomBootstrap";
import FormGameCurrency from "./subcomponentsTwoTabs/FormGameCurrency";
import ShowGameCurrency from "./subcomponentsTwoTabs/ShowGameCurrency";
import axios from "axios";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";




class TabsCardGameCurrency extends Component {
    constructor(props) {
        super(props);

        this.toggleFirstTab = this.toggleFirstTab.bind(this);
        this.toggleSecondTab = this.toggleSecondTab.bind(this);
        this.state = {
            activeFirstTab: "1",
            activeSecondTab: "1"
        };
    }

    toggleFirstTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
        }
    }
    toggleSecondTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeSecondTab: tab
            });
        }
    }
    render() {
        return (
            <Row className="col-12">
                <Colxx xxs="12" xs="12" lg="12">
                    <CardTitle className="mb-4 d-flex">

                        <div className=" ">
                            <NavLink
                                to={`/app/dashboards/game-mode`}
                            >
                                <IntlMessages id="Home"/>
                            </NavLink>
                        </div>

                        <div className=" ml-2 mr-2">
                            <IntlMessages id="|"/>
                        </div>

                        <div className="">
                            <NavLink
                                to={`/app/dashboards/game-mode`}
                            >
                                <IntlMessages id="Resource Management"/>
                            </NavLink>
                        </div>

                    </CardTitle>
                    <Row>

                        <Colxx xxs="12" xs="12" lg="12">
                            <Card className="mb-4">

                                <CardHeader className="pl-0 pr-0">
                                    <Nav tabs className=" card-header-tabs  ml-0 mr-0">
                                        <NavItem className="w-50 text-center">
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.activeSecondTab === "1",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleSecondTab("1");
                                                }}
                                                to="#"
                                            >
                                                <h2>Create</h2>

                                            </NavLink>
                                        </NavItem>
                                        <NavItem className="w-50 text-center">
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.activeSecondTab === "2",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleSecondTab("2");
                                                }}
                                                to="#"
                                            >
                                                <h2>Show</h2>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardHeader>

                                <TabContent activeTab={this.state.activeSecondTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <FormGameCurrency/>

                                                </CardBody>
                                            </Colxx>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <ShowGameCurrency/>

                                                </CardBody>
                                            </Colxx>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </Card>
                        </Colxx>

                    </Row>
                </Colxx>
            </Row>
        );
    }
}

export default TabsCardGameCurrency;