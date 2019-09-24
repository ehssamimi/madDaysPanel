import React, {Component} from 'react';

import img from './../../../../../assets/pizza.jpg';

import {Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import axios from "axios";
import NotificationManager from "../../../../../../components/common/react-notifications/NotificationManager";
import IntlMessages from "../../../../../../helpers/IntlMessages";
import {TweenMax} from "gsap/TweenMax";
import * as Const from "../../../../../Const";

var classNames = require('classnames');

class RowCurrencyItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            modal:false,imgHover:false,liClasses:classNames({
                'border-0': true,
                'img-Game-Item': true,
                // 'hoverImg': true
            })
        };
        this.trash = React.createRef();

    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    DeleteItem = () => {
        let{order,id}=this.props;
        // console.log(order._id,id);
        let LootBoxId=id;
        let ItemId=order._id;
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        let form = new FormData();
        form.append('ItemId', ItemId);
        form.append('LootBoxId', LootBoxId);

        axios.post(`${Const.URL}admin/lootbox/items/delete` ,form, {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            console.log(Description);
            if (Description==="D"){
                NotificationManager.success(
                    "congratulation",
                    "Game Currency deleted",
                    3000,
                    null,
                    null,
                    "success"
                );
                this.toggle();
                setTimeout(function(){window.location.reload();}, 3000);


            }

            // let DES=JSON.parse(Description);
            // this.props.inprogress(DES);x
            console.log(Description)
        }).catch(error=>{console.log(error)});
    };
    handelHover(){
        // let object = this.refs.trash;
        let liClasses = classNames({
            'border-0': true,
            'img-Game-Item': true,
            'hoverImg': !this.state.imgHover
            // 'hoverImg': true
        });

        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,liClasses
        }));

        // console.log(this.state.hoverImg);
        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);        // let button=document.getElementById("button");
        // console.log(button)


        // TweenMax.to(button,2,{x:'-3px',y:'-5px',scale:2});
        // TweenMax.to(button,2,{css:{left:'-1.5px',bottom:'-5px',scale:2}});
        TweenMax.to(button,0.5,{css:{ left:'20%',top:'40%',scale:2}});
        // TweenMax.to(button,0.5,{css:{ left:'-20px',scale:2}});

    }
    handelHoveOut(){
        let liClasses = classNames({
            'border-0': true,
            'img-Game-Item': true,
            'hoverImgUndo':this.state.imgHover
            // 'hoverImg': true
        });

        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,liClasses
        }));
        // console.log(this.state.hoverImg);

        // console.log(button)

        // let trash=document.window.getElementById("trash");
        // let trash =;
        // TweenMax.to(trash,2,{css:{scale:'75vw'}});
        // TweenMax.to(button,2,{x:'-3px',y:'-5px',scale:2});
        TweenMax.to(button,0.5,{css:{left:'40%',top:'0%',scale:1}});
    }

    render() {
        let {order,index}=this.props;
        let {imgHover,liClasses}=this.state;
        console.log(order);
        // Create_at: "2019-07-02 11:31:05.608000"
        // ImageUrl: "mony/coin-pack-2"
        // ItemType: "Currency"
        // Name: "500 Coin"
        // Price: 234
        // SKU: "medium-coin-pack"
        // Type: "Coin"
        // Update_at: "2019-07-02 11:31:05.608000"
        // Value: 500
        // _id: "5d1b407923fd70b0b4a88a71"


        return (
            <div className="col-sm-12 float-left">
                <div className="d-flex  mb-3 position-relative  w-100">
                    <div onMouseEnter={this.handelHover.bind(this)} onMouseLeave={this.handelHoveOut.bind(this)}>
                        <img
                            src={img}
                            alt={order.Name}
                            // className=" border-0 img-Game-Item hoverImg"
                            // className={["border-0","img-Game-Item",imgHover?"hoverImg":""].join(" ")}
                            className={liClasses}
                        />
                        <div>
                            <Button outline color={"white"} className="trashIcon " onClick={this.toggle}
                                    ref={(node) => this.buttonref = node} id={`button ${index}`}>
                                <i className="simple-icon-trash"/>
                            </Button>
                        </div>
                    </div>



                    <div className="pl-3 pt-2 pr-2 pb-2">

                        <p className="list-item-heading"><span>ItemType : </span>{order.ItemType}</p>
                        <p className="list-item-heading"><span>Type : </span>{order.Type}</p>
                        <p className="list-item-heading"><span>ImageUrl : </span>{order.ImageUrl}</p>
                        <p className="list-item-heading"><span>Name : </span >{order.Name}</p>
                        <p className="list-item-heading"><span>Price : </span>{order.Price}</p>
                        <p className="list-item-heading"><span>Value : </span>{order.Value}</p>
                        <p className="list-item-heading"><span>SKU : </span>{order.SKU}</p>
                        {/*<div className="text-primary text-small font-weight-medium d-none d-sm-block">*/}
                            {/*<span>Update_at:</span> {order.Update_at.slice(0, 10)}*/}
                        {/*</div>*/}
                    </div>
                    {/*<div  >*/}
                    {/*/!*<Button outline color={"white"} className="trashIcon "  onClick={this.toggle} ref={(node)=>this.buttonref=node} >*!/*/}
                    {/*<Button outline color={"white"} className="trashIcon "  onClick={this.toggle} ref={this.trash} id="button">*/}
                    {/*<i className="simple-icon-trash" />*/}
                    {/*</Button>*/}
                    {/*</div>*/}
                </div>
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
            </div>



        );
    }
}

export default RowCurrencyItem;