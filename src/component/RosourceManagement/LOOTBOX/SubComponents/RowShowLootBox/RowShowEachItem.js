import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle, Badge ,Button} from "reactstrap";

import IntlMessages from "../../../../../helpers/IntlMessages";
import data from "../../../../../data/products";
import img from './../../../../assets/detail.jpg'
import RowEachItem from "./ShowEachItem/RowEachItem";
import AddItemToLootBox from "./ShowEachItem/subcomponent/AddItemToLootBox";
import AddItemInLootBox from "./ShowEachItem/subcomponent/AddItemInLootBox";
import RowCurrencyItem from "./ShowEachItem/RowCurrencyItem";
// import RowEachItem from "./ShowEachItem/RowEachItem";
// import {TweenMax, Bounce,Power4, TimelineLite} from "gsap/TweenMax";



class RowShowEachItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            open:false
        }
    }

    handelAdd(){
        this.setState(prevState => ({
            open:!prevState.open
        }))

    }
    render() {
        let{Data,id}=this.props;
        let{open}=this.state;
        console.log(Data);
        let Length=Data.length;

        // var rowDelay=document.getElementsByClassName('rowDelay');
        // if (rowDelay) {
        //     TweenMax.staggerFrom('.rowDelay',2,{y:'100vh',ease:Power4.easeInOut},0.1)
        // }

        // console.log(Length);

        // let order=Data[0];
        return (
            <div className="w-100">
                <Card>

                    <div className="col-12">
                        <CardTitle className="float-left mt-4 ml-4">
                            <IntlMessages id="Game Item" />
                        </CardTitle>
                        <Button outline color={"white"} className="icon-button.large float-right mt-3" onClick={this.handelAdd.bind(this)}  >
                            {open===false? <i className="simple-icon-plus text-large large" />:<i className="simple-icon-minus text-large large" />}
                        </Button>
                    </div>

                    <CardBody>



                        <div className="scroll dashboard-list-with-thumbs">
                            <PerfectScrollbar
                                option={{ suppressScrollX: true, wheelPropagation: false }}
                            >
                                {Length>0?Data.map((order, index) => order.ItemType==="GameItem"? <RowEachItem order={order} index={index} key={index} id={id}/> :<RowCurrencyItem order={order} index={index} key={index} id={id}/>
                                ):<h2>there is no game item</h2>}
                            </PerfectScrollbar>
                        </div>
                    </CardBody>
                </Card>
                {open===false? "" : <AddItemInLootBox id={id} /> }



            </div>

        );
    }
}

export default RowShowEachItem;