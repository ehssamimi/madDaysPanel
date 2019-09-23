import React, {Component} from 'react';
import axios  from 'axios';
// import {Row} from "reactstrap";
import RowShowGameMode from "../../GameCurrency/subcomponentsTwoTabs/RowShowGameMode/RowShowGameMode";

class ShowXpLevelPerRange extends Component {
    constructor(props) {
        super(props);
        this.state={
            modes:[],levelUps:[]
        }
    }
    componentDidMount(){
        let headers = {
            // 'Id': localStorage.getItem('IdGameHandmade'),
            // 'Token': localStorage.getItem('TokenGameHandmade')
            'Id': "5d1870f09d79a3cc6e224e59",
            'Token': "a698d224f32b856f7b066792ca544b875a28478081af5e049f834bfa3d995179"
        };
        axios.post(`https://resource.themaddays.com/admin/action/eachlevelup/level/available`, null,{headers:headers}).then(responsive=>
        {
            const {Description} = responsive.data;
            this.setState({
                levelUps:Description
            })
        }).catch(error=>{console.log(error)});
        let index;
        for(index in this.state.levelUps){
            let level=this.state.levelUps[index];
            console.log(level);
        }
        // axios.get(`https://resource.themaddays.com/xps/level/range/${this.state.levelUps[0]}`,{headers:headers}).then(responsive=>
        // {
        //     const {Description} = responsive.data;
        //     // this.setState({
        //     //     levelUps:Description
        //     // })
        //     console.log(Description)
        // }).catch(error=>{console.log(error)});



    }
    render() {
        let {modes,levelUps}=this.state;
        console.log(levelUps);
        // console.log(modes);
        return (
            <div>
                {/*<Row>*/}
                    {/*{modes?modes.map((todo ,index)=><RowShowGameMode key={index} input={todo} /> ):""}*/}
                {/*</Row>*/}

            </div>
        );
    }
}

export default ShowXpLevelPerRange;