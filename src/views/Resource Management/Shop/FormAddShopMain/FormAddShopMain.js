import React, {Component} from 'react';
import axios from "axios";
import FormAddShopItem from "../../../../component/RosourceManagement/Shop/subComponents/FormAddShopItem";
// import {CardBody} from "reactstrap";
import * as Const from "../../../../component/Const";
class FormAddShopMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShopItemTypeOption: [],
            CostskeysTypeOption: [],
            ShopTypeOption: [],
        };
    }
    componentDidMount(){

        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };

        axios.get(`${Const.URL}admin/shop/shopitemtypes/get` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;

            let DES=JSON.parse(Description);
            // console.log(DES);
            let ShopItemTypeOption = [];let index;
            for (index in DES) {
                ShopItemTypeOption.push({value: DES[index], label: DES[index]})
            }
            this.setState({
                ShopItemTypeOption
            })
            // console.log(this.state.ShopItemTypeOption)

        }).catch(error=>{console.log(error)});
        axios.get(`${Const.URL}admin/shop/cost/types/get` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let DES=JSON.parse(Description);
            // console.log(DES);
            let CostskeysTypeOption = [];let index;
            for (index in DES) {
                CostskeysTypeOption.push({value: DES[index], label: DES[index]})
            };
            this.setState({
                CostskeysTypeOption
            });
            // console.log(this.state.CostskeysTypeOption)

        }).catch(error=>{console.log(error)});
        axios.get(`${Const.URL}admin/shop/type/get` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let DES=JSON.parse(Description);
            // console.log(DES);
            let ShopTypeOption = [];let index;
            for (index in DES) {
                ShopTypeOption.push({value: DES[index], label: DES[index]})
            };
            this.setState({
                ShopTypeOption
            });
            // console.log(this.state.ShopTypeOption)

        }).catch(error=>{console.log(error)});
    }
    render() {
        return (
            <div>
                <FormAddShopItem ShopItemTypeOption={this.state.ShopItemTypeOption} CostskeysTypeOption={this.state.CostskeysTypeOption} ShopTypeOption={this.state.ShopTypeOption}/>
            </div>
        );
    }
}

export default FormAddShopMain;