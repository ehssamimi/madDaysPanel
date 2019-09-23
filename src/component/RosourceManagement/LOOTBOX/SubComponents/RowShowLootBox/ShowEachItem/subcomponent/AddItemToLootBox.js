// AddItemToLootBox
import React from "react";
import ReactAutoSuggest from "../../../../../../../components/common/ReactAutoSuggest";
import { injectIntl } from "react-intl";
import cakes from "../../../../../../../data/cakes";
import  axios from 'axios'
const AddItemToLootBox = (props) => {
    const { messages } = props.intl;
    let headers = {
        // 'Id': localStorage.getItem('IdGameHandmade'),
        // 'Token': localStorage.getItem('TokenGameHandmade')
        'Id': "5d1870f09d79a3cc6e224e59",
        'Token': "a698d224f32b856f7b066792ca544b875a28478081af5e049f834bfa3d995179"
    };
    axios.get(`https://resource.themaddays.com/admin/gameitem/search/n`,{headers:headers}).then(responsive=>
    {
        const {Description} = responsive.data;

        let index;let Device=[];
        let Data=JSON.parse(Description);
        for (index in Data){
            Device.push({title:Data[index].Name ,id:Data[index]._id})
        }
        console.log(Device);
        return Device
        // ChanceType: "Common"
        // Create_at: "2019-06-26 07:57:43.215000"
        // ImageUrl: "unjat"
        // ItemType: "Armlet"
        // Key: "amin"
        // Name: "amin3"
        // Tag: "reza"
        // Update_at: "2019-06-26 07:57:43.216000"
        // _id: "5d1325771eb2e9cea390398d"


        // let levelUps = [];let level;let index;
        // for (index in Description) {
        //     level={value: Description[index], label: Description[index]}
        //     levelUps.push(level)
        // }
        // // console.log(levelUps);
        //
        // this.setState({
        //     levelUps
        // })
    }).catch(error=>{console.log(error)});

    const data = cakes.map(item => {
        return {name: item.title}
    });
    return (
        <ReactAutoSuggest
            placeholder={messages["type item name"]}
            data={data}
            onChange={value => {}}
        />
    );
};

export default injectIntl(AddItemToLootBox);

