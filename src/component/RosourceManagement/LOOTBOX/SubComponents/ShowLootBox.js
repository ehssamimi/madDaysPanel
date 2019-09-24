import React, {Component} from 'react';
import axios from "axios";
import {Row} from "reactstrap";
import RowShowLootBox from "./RowShowLootBox/RowShowLootBox";
import ShowEachItem from "./RowShowLootBox/ShowEachItem/ShowEachItem";
import LootBox from "../LootBox";
import tahdig from '../../../assets/tahdige.jpg'
import {Power4, TweenMax} from "gsap/TweenMax";
import * as Const from "../../../Const";



class ShowLootBox extends Component {
    constructor(props) {
        super(props);
        this.state={
            modes:[],
            click:false,
            lootBoxInfo:{}
        }


    }
    componentDidMount(){
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        axios.get(`${Const.URL}admin/get/lootbox` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            //
            let DES=JSON.parse(Description);
            // console.log('DES')
            // console.log(DES.Data)
            this.setState({
                modes:DES.Data
            })

        }).catch(error=>{console.log(error)});
    }
    handelClick(index){
        // console.log(this.state.modes);
        let lootBoxInfo=this.state.modes[index];
        // console.log(this.state.modes[index]);

        this.setState({
            click:true,
            lootBoxInfo }, () => {
            console.log(lootBoxInfo)
        });


    }
    handelback(){
        this.setState({
            click:false,

        });
    }

    render() {
        let rowDelay=document.getElementsByClassName('rowDelay');
        if (rowDelay) {
            TweenMax.staggerFrom('.rowDelay',1.5,{y:'100vh',ease:Power4.easeInOut},0.1)
        }
        let {modes}=this.state;
        return (
            <div>
                {
                    this.state.click?<ShowEachItem  handelClick={this.handelback.bind(this)}  lootBoxInfo={this.state.lootBoxInfo}/>:<Row> {modes?modes.map((todo ,index)=><RowShowLootBox img={tahdig} key={index} index={index} input={todo}  handelClick={this.handelClick.bind(this, index)}/> ):""}</Row>
                }

            </div>
        );
    }
}

export default ShowLootBox;