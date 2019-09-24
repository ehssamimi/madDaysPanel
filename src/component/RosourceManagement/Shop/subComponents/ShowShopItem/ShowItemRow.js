import React, {Component, Fragment} from 'react';
import img from '../../../../assets/detail.jpg'
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

} from "reactstrap";
import { Colxx } from "../../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import RowShowShow from "./RowShowShow";
import axios from "axios";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import * as Const from "../../../../Const";
var classNames = require('classnames');



class ShowItemRow extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1",modal:false,id:"",imgHover:false,liClasses:classNames({
                'card-img-top': true,
            })
        };
    }

    componentDidMount(){
        let {input}=this.props;
        this.setState({
            id: input._id
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
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    DeleteItem = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        let id=this.state.id;
        console.log(id);
        // alert(`${Name} is deleted`);
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        axios.get(`${Const.URL}admin/shop/items/delete/${id}` , {headers:headers}).then(responsive=>
        {

            NotificationManager.success(
                "congratulation",
                "Shop Item deleted",
                3000,
                null,
                null,
                "success"
            );

            let id=this.state.id;
            const $el = document.getElementById(`${id}`);
            const duration = 2;
            const from = { opacity: 0};
            TweenMax.to($el, duration, from);
            setTimeout(() => {
                $el.remove();
            }, 3000)

            // let DES=JSON.parse(Description);
            // console.log(DES)
            // this.props.inprogress(DES);


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
        let {input,index}=this.props;
        let {liClasses}=this.state;
        // console.log(input);
        // console.log(input._id);
        // console.log(input.IsActive);

        // Cost: 45
        // CostType: "InGame"
        // GameItemList: "amin"
        // ImageUrl: "/admin/unja"
        // Name: "amin"
        // SKU: "35kkjvspidfj4=454"
        // ShopItemType: "Cool"
        // _id: "5d13417c222014ce154f04e4"


        return (
            <Fragment>

                <Colxx xxs="12" lg="4" className="mb-4 rowDelay" id={this.state.id}>
                    <Card className="mb-4">
                        {/*<div className="position-absolute card-top-buttons"  onClick={this.toggle}>*/}
                            {/*<Button outline color={"white"} className="icon-button">*/}
                                {/*<i className="simple-icon-trash" />*/}
                            {/*</Button>*/}
                        {/*</div>*/}
                        {/*<img*/}
                            {/*src={img}*/}
                            {/*alt="Detail"*/}
                            {/*className="card-img-top"*/}
                        {/*/>*/}
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
                                    <RowShowShow label="Cost" value={input.Cost}/>
                                </div>
                                <div className="col-6">
                                    <RowShowShow label="CostType" value={input.CostType}/>
                                </div>
                            </div>
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label="ImageUrl" value={input.ImageUrl}/>
                                </div>
                                <div className="col-6">
                                    <RowShowShow label="Name" value={input.Name}/>
                                </div>
                            </div>
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label="SKU" value={input.SKU}/>
                                </div>
                                <div className="col-6">
                                    <RowShowShow label="ShopItemType" value={input.ShopItemType}/>
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

export default ShowItemRow;