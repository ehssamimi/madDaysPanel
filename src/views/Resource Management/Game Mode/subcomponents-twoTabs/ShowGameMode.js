import React, {Component} from 'react';
import ShoeGameRowMode from "./ShoeRowGameMode/ShoeGameRowMode";
import axios  from 'axios';
import {Row} from "reactstrap";
import breakfast from '../../../../component/assets/breakfast.jpg'
import {Power4, TweenMax} from "gsap/TweenMax";
import * as Const from './../../../../component/Const';
import loader from "../../../../component/assets/6.gif";





class ShowGameMode extends Component {
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
        axios.get(`${Const.URL}modes` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let DES=JSON.parse(Description);
            this.setState({
                modes:DES.Data
            });
            console.log(this.state.modes);

        }).catch(error=>{console.log(error)});
    }
    render() {
        let {modes}=this.state;
        let rowDelay=document.getElementsByClassName('rowDelay');
        if (rowDelay) {
            TweenMax.staggerFrom('.rowDelay',1.5,{y:'100vh',ease:Power4.easeInOut},0.1)
        }
        return (
            <div>
                <Row>
                    {modes.length>0?modes.map((todo ,index)=><ShoeGameRowMode key={index} input={todo} index={index} img={breakfast}/> ):<div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>}
                </Row>
            </div>
        );
    }
}

export default ShowGameMode;