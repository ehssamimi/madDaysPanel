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

import axios from "axios";
import FormAddShopItem from "./subComponents/FormAddShopItem";
import ShowShopItem from "./subComponents/ShowShopItem";

class TabCardShop extends Component {
    constructor(props) {
        super(props);

        this.toggleFirstTab = this.toggleFirstTab.bind(this);
        this.toggleSecondTab = this.toggleSecondTab.bind(this);
        this.state = {
            activeFirstTab: "1",
            activeSecondTab: "1",
            ShopItemTypeOption: [],
            CostskeysTypeOption: [],
            ShopTypeOption: [],


        };
    }
    componentDidMount(){

        let headers = {
            'Id': "5d1870f09d79a3cc6e224e59",
            'Token': "a698d224f32b856f7b066792ca544b875a28478081af5e049f834bfa3d995179"
        };

         axios.get(`https://resource.themaddays.com/admin/shop/shopitemtypes/get` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;

            let DES=JSON.parse(Description);
            // console.log(DES);
            let ShopItemTypeOption = [];let index;
            for (index in DES) {
                ShopItemTypeOption.push({value: DES[index], label: DES[index]})
            }
            this.setState({
                ShopItemTypeOption
            })
            // console.log(this.state.ShopItemTypeOption)

        }).catch(error=>{console.log(error)});

        axios.get(`https://resource.themaddays.com/admin/shop/cost/types/get` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let DES=JSON.parse(Description);
            // console.log(DES);
            let CostskeysTypeOption = [];let index;
            for (index in DES) {
                CostskeysTypeOption.push({value: DES[index], label: DES[index]})
            };
            this.setState({
                CostskeysTypeOption
            });
            // console.log(this.state.CostskeysTypeOption)

        }).catch(error=>{console.log(error)});
        axios.get(`https://resource.themaddays.com/admin/shop/type/get` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let DES=JSON.parse(Description);
            // console.log(DES);
            let ShopTypeOption = [];let index;
            for (index in DES) {
                ShopTypeOption.push({value: DES[index], label: DES[index]})
            };
            this.setState({
                ShopTypeOption
            });
            // console.log(this.state.ShopTypeOption)

        }).catch(error=>{console.log(error)});
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
                                                    <FormAddShopItem ShopItemTypeOption={this.state.ShopItemTypeOption} CostskeysTypeOption={this.state.CostskeysTypeOption} ShopTypeOption={this.state.ShopTypeOption}/>
                                                </CardBody>
                                            </Colxx>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <ShowShopItem/>
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

export default TabCardShop;