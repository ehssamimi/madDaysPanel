import React, {Component,Fragment} from 'react';
// import img from '../../../../assets/detail.jpg'
import * as Const from './../../../../Const'

import {
    Row,
    Card,
    CardBody,
    Button,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import { Colxx } from "../../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import RowShowEachItem from "../../../LOOTBOX/SubComponents/RowShowLootBox/RowShowEachItem";
import RowShowShow from "../../../Shop/subComponents/ShowShopItem/RowShowShow";
import {Power4, TweenMax} from "gsap/TweenMax";
import axios from "axios";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";

var classNames = require('classnames');


class RowShowGameMode extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1",modal:false,Name:"",imgHover:false,liClasses:classNames({
                // 'border-0': true,
                'card-img-top': true,
            })
        };
    }
    componentDidMount(){
        let {input}=this.props;
        this.setState({
            Name: input._id
        });
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
        }
    }
    toggle = () => {
        console.log("toggel");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    DeleteItem = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        let Name=this.state.Name;
        // alert(`${Name} is deleted`);
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        console.log(Name);
        axios.get(`${Const.URL}/shop/delete/ingamecurrency/${Name}` , {headers:headers}).then(responsive=>
        {

            const {Description}=responsive.data;
            console.log(Description);
            if (Description==='D'){
                NotificationManager.success(
                    "congratulation",
                    "that game currency is delete",
                    3000,
                    null,
                    null,
                    "success"
                );
                let id=this.props.input._id;
                const $el = document.getElementById(`${id}`);
                const duration = 2;
                const from = { opacity: 0};
                TweenMax.to($el, duration, from);
                setTimeout(() => {
                    $el.remove();
                }, 2000)

                // setTimeout(function(){ window.location.reload(); }, 3000);
            }else{
                NotificationManager.success(
                    "cant delete Game currency",
                    Description,
                    3000,
                    null,
                    null,
                    "success"
                );
            }
        }).catch(error=>{console.log(error)});
    };
    handelHover(){
        let liClasses = classNames({
            'card-img-top': true,
            'hoverImg': !this.state.imgHover
        });

        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,liClasses
        }));

        // console.log(this.state.hoverImg);
        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        TweenMax.to(button,0.5,{css:{ left:'40%',top:'30%',scale:3}});
    }
    handelHoveOut(){
        let liClasses = classNames({
            'card-img-top': true,
            'hoverImg': this.state.imgHover
            // 'hoverImg': true
        });

        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,
            liClasses
        }));
        // console.log(this.state.hoverImg);
        TweenMax.to(button,0.5,{css:{left:'0%',top:'0%',scale:1}});
    }


    render() {
        let {input, img, index}=this.props;
        let {liClasses}=this.state;

        console.log(input);
        // console.log(input.IsActive);

        // form["Type"], form["Price"], form["Value"], form["ImageUrl"], form["SKU"],form["Name"]



        return (
            <Fragment>

                <Colxx xxs="12" lg="4" className="mb-4 rowDelay" id={input._id}>
                    <Card className="mb-4">
                        <div onMouseEnter={this.handelHover.bind(this)} onMouseLeave={this.handelHoveOut.bind(this)}>
                            {/*<div className="position-absolute card-top-buttons" onClick={this.toggle}>*/}
                            {/*<Button outline color={"white"} className="icon-button"   id={`button ${index}`}>*/}
                            {/*<i className="simple-icon-trash" />*/}
                            {/*</Button>*/}
                            {/*</div>*/}
                            {/*<img*/}
                            {/*src={img}*/}
                            {/*alt="Detail"*/}
                            {/*className={liClasses}*/}
                            {/*/>*/}

                            <img
                                src={img}
                                alt={index}
                                className={liClasses}
                            />
                            <div>
                                <Button outline color={"white"} className="trashIconBox " onClick={this.toggle}
                                        id={`button ${index}`}>
                                    <i className="simple-icon-trash"/>
                                </Button>
                            </div>
                        </div>

                        <CardBody  className="d-flex flex-column">
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label={"Type"} value={input.Type} />
                                </div>
                                <div className="col-6">
                                    <RowShowShow label={"Price"} value={input.Price} />
                                </div>
                            </div>
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label={"Value"} value={input.Value} />
                                </div>
                                <div className="col-6">
                                    <RowShowShow label={"SKU"} value={input.SKU} />
                                </div>
                            </div>
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label={"Name"} value={input.Name} />
                                </div>
                                <div className="col-6">
                                    <RowShowShow label={"ImageUrl"} value={input.ImageUrl} />
                                </div>
                            </div>
                            <div className="col-12 d-flex">
                                <div className="col-12">
                                    <RowShowShow label={"ChanceType"} value={input.ChanceType}/>
                                </div>
                            </div>


                        </CardBody>
                    </Card>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            <IntlMessages id="Delete Item" />
                        </ModalHeader>
                        <ModalBody>
                            Are You Really fucking sure ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.DeleteItem}>
                                Delete Item
                            </Button>{" "}
                            <Button color="secondary" onClick={this.toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                </Colxx>


            </Fragment>
        );
    }

}

export default RowShowGameMode;