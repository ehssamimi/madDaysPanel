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
    TabPane,
    // Button
} from "reactstrap";
import { NavLink } from "react-router-dom";

import classnames from "classnames";
import IntlMessages from "./../../../helpers/IntlMessages";
import {Colxx} from "../../../components/common/CustomBootstrap";
// import FormGameCurrency from "../GameCurrency/subcomponentsTwoTabs/FormGameCurrency";
// import ShowGameCurrency from "../GameCurrency/subcomponentsTwoTabs/ShowGameCurrency";
import UpdateAcionsWithKeys from "./subcomponents/UpdateAcionsWithKeys";
import UpdateActionsForEachLevel from "./subcomponents/UpdateActionsForEachLevel";
import ShowXpLevelPerRange from "./subcomponents/ShowXpLevelPerRange";

class TabCardActionExp extends Component {
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
                                        <NavItem className="col-4 text-center">
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
                                                <h2>update action with key</h2>

                                            </NavLink>
                                        </NavItem>
                                        <NavItem className="col-4 text-center">
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
                                                <h2>update action each level</h2>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem className="col-4 text-center">
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.activeSecondTab === "3",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleSecondTab("3");
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
                                                    <UpdateAcionsWithKeys/>

                                                </CardBody>
                                            </Colxx>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>

                                            <Colxx sm="12">
                                                <CardBody>
                                                    <UpdateActionsForEachLevel/>

                                                </CardBody>
                                            </Colxx>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <ShowXpLevelPerRange/>

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

export default TabCardActionExp;
