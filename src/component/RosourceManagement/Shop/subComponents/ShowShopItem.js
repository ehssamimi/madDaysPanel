import React, {Component} from 'react';
import axios from "axios";
import {Row} from "reactstrap";
import ShoeGameRowMode from "../../GameMode/subcomponents-twoTabs/ShoeRowGameMode/ShoeGameRowMode";
import ShowItemRow from "./ShowShopItem/ShowItemRow";
import {Power4, TweenMax} from "gsap/TweenMax";
import * as Const from "../../../Const";



class ShowShopItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            modes:[]
        }
    }
    componentDidMount(){
        // classNames({ 'foo-bar': true }); // => 'foo-bar'
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        axios.get(`${Const.URL}shop/get/all` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let DES=JSON.parse(Description);
            // console.log(DES.Items);
            this.setState({
                modes:DES.Items
            })
            // console.log(this.state.modes);

        }).catch(error=>{console.log(error)});
    }
    render() {
        let {modes}=this.state;
        console.log(modes);

        // let rowDelay=document.getElementsByClassName('rowDelay');
        // if (rowDelay) {
        //     TweenMax.staggerFrom('.rowDelay',1.5,{y:'100vh',ease:Power4.easeInOut},0.1)
        // }
        return (
            <div>
                <Row>
                    {modes?modes.map((todo ,index)=><ShowItemRow key={index} input={todo} index={index} /> ):""}
                </Row>
            </div>
        );
    }
}

export default ShowShopItem;