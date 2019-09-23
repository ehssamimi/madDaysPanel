import React, {Component} from 'react';
import axios from "axios";
import {Row} from "reactstrap";
import ShoeGameRowMode from "../../GameMode/subcomponents-twoTabs/ShoeRowGameMode/ShoeGameRowMode";
import ShowItemRow from "./ShowShopItem/ShowItemRow";
import {Power4, TweenMax} from "gsap/TweenMax";


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
            'Id': "5d1870f09d79a3cc6e224e59",
            'Token': "a698d224f32b856f7b066792ca544b875a28478081af5e049f834bfa3d995179"
        };
        console.log(headers);
        axios.get(`https://resource.themaddays.com/shop/get/all` , {headers:headers}).then(responsive=>
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