import React, {Component} from 'react';
// import RecentOrders from "../../../../../../containers/dashboards/RecentOrders";
import RowShowEachItem from "../RowShowEachItem";
// import RowShowLootBox from "../RowShowLootBox";
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
import ShowLootBoxInItem from "./ShowLootBoxInItem";
import {Power4, TweenMax} from "gsap/TweenMax";
class ShowEachItem extends Component {

    componentDidMount(){
        let BoxInItem=document.getElementsByClassName('BoxInItem');
        if (BoxInItem){
            TweenMax.staggerFrom('.BoxInItem',1.5,{x:'20vw',ease:Power4.easeInOut});
            TweenMax.staggerFrom('.LootBoxItemList',2,{y:'100vh',ease:Power4.easeInOut},1.5)
        }
    }
    render() {
        // console.log(this.props.lootBoxInfo)
        let{handelClick}=this.props;
        return (
            <div className="w-100 BoxInItem ">
                {/*/!*<RecentOrders/>*!/   handelClick={this.handelClick.bind(this)}  lootBoxInfo={this.state.lootBoxInfo}*/}
                <div className="col-12">
                        <Button outline color={"white"} className="icon-button w-10 " onClick={handelClick}  >
                            <i className="iconsminds-arrow-back-3 " />
                        </Button>
                </div>

                <div className="col-12 mt-2">
                    <div className="col-lg-5 col-12 float-left ">
                        <ShowLootBoxInItem  input={this.props.lootBoxInfo}  handelClick={this.props.handelClick}/>
                    </div>
                    <div className="col-lg-7 col-12 float-left d-flex LootBoxItemList">
                        <RowShowEachItem Data={this.props.lootBoxInfo.ItemList} id={this.props.lootBoxInfo._id}  />
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowEachItem;