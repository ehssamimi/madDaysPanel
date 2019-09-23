import React, {Component} from 'react';
import axios  from 'axios';
import {Row} from "reactstrap";
import RowShowGameMode from "./RowShowGameMode/RowShowGameMode";
import breakfast2 from '../../../assets/breakfast2.jpg'
import {Power4, TweenMax} from "gsap/TweenMax";
import * as Const from './../../../../component/Const';
import loader from "../../../assets/6.gif";



class ShowGameCurrency extends Component {
    constructor(props) {
        super(props);
        this.state={
            modes:[]
        }
    }
    componentDidMount(){
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        axios.get(`${Const.URL}shop/item/get` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            // console.log(Description);
            let DES=JSON.parse(Description);
            // console.log(DES)
            // this.props.inprogress(DES);
            this.setState({
                modes:DES.Data
            })
            // console.log(this.state.modes);

        }).catch(error=>{console.log(error)});
    }
    render() {
        let {modes}=this.state;
        let rowDelay=document.getElementsByClassName('rowDelay');
        if (rowDelay) {
            TweenMax.staggerFrom('.rowDelay',1.5,{y:'100vh',ease:Power4.easeInOut},0.1)
        }
        // console.log(modes);
        return (
            <div>
                <Row>
                    {modes.length>0?modes.map((todo ,index)=><RowShowGameMode key={index} input={todo} index={index} img={breakfast2} /> ):<div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>}
                </Row>

            </div>
        );
    }
}

export default ShowGameCurrency;