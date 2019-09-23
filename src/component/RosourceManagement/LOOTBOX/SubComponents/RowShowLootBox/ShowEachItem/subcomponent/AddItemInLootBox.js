import React, {Component} from 'react';
// import ReactAutoSuggest from "../../../../../../../components/common/ReactAutoSuggest";
// import { injectIntl } from "react-intl";
// import cakes from "../../../../../../../data/cakes";
import  axios from 'axios'
import NotificationManager from "../../../../../../../components/common/react-notifications/NotificationManager";
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle
} from "reactstrap";
import IntlMessages from "../../../../../../../helpers/IntlMessages";
import AutoSuggestEdit from "../../../../../test/AutoSuggestEdit";
import Select from "react-select";
// import {Field, Form, Formik} from "formik";
// import {FormikReactSelect} from "../../../../../../../containers/form-validations/FormikFields";
import {Colxx} from "../../../../../../../components/common/CustomBootstrap";
import CustomSelectInput from "../../../../../../../components/common/CustomSelectInput";
import * as Const from "../../../../../../Const";


const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Both", label: "Both" },
    { value: "Gun", label: "Gun" }
];
const options2 = [
    { value: "Common", label: "Common" },
    { value: "Rare", label: "Rare" },
    { value: "Epic", label: "Epic" },
    { value: "Legendery", label: "Legendery" }
];
// const selectData = [
//     { label: "GameItem", value: "GameItem", key: 0 },
//     { label: "GameCurrency", value: "GameCurrency", key: 1 },
// ];

class AddItemInLootBox extends Component {
    constructor(props) {
        super(props);
        this.state={
            Device:[], DATA:[],value:"n",dict:{},DefaultData:[],tagKind: "",chanceType:"",originalData:[],changer:"",rightData:[],selectedOption: "",
            selectData:[],currencyData:[],dictCurrency:{},currencyValue:'',mainType:[]

        }
    }

    componentDidMount(props){
        let {value}=this.state;

        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        axios.get(`${Const.URL}admin/gameitem/search/${value}`,{headers:headers}).then(responsive=>
        {
            const {Description} = responsive.data;
            // console.log(`https://resource.themaddays.com/admin/gameitem/search/${value}`);

            let index;let Device=[];
            let Data=JSON.parse(Description);
            // console.log(Data);
            for (index in Data){
                Device.push({title:Data[index].Name ,id:Data[index]._id,Tag:Data[index].Tag,ChanceType:Data[index].ChanceType})
            }
            const result = Data.filter(word => word.Tag ==="Male");
            // console.log(result);
            console.log(Device);

            let dict = {};
            for (index in Data){
                let id =Data[index].Name;
                let Value =Data[index]._id;
                    dict[id] = Value;
                    // dict[Value] = id;
            }
            let DATA=[];
            // Device.map(item => {
            //     DATA.push({name: item.title})
            // });
            Device.map(item => {
                DATA.push({name: item.id})
            });
            this.setState({
                Device,
                DATA,dict,DefaultData:DATA,originalData:Data
            });

            // console.log(this.state.DATA);

        }).catch(error=>{console.log(error)});
        axios.get(`${Const.URL}admin/lootbox/items/type`,{headers:headers}).then(responsive=>
        {
            const {Description} = responsive.data;
            let Data=JSON.parse(Description);
            let selectData=[];
           let i;
            for (i in Data ) {
                selectData.push({
                    label:Data[i],value:Data[i],key:i
                })
            }
            this.setState({selectData,mainType:Data});

        }).catch(error=>{console.log(error)});

        axios.get(`${Const.URL}shop/item/get`,{headers:headers}).then(responsive=>
        {
            const {Description} = responsive.data;
            console.log(Description);
            let Data=JSON.parse(Description);
            let currencyData=[];let i; let dictCurrency = {};
            let Currency=Data.Data;
            console.log(Currency);
            for (i in Currency ) {
                currencyData.push({
                    name:Currency[i].Name
                });
                let id =Currency[i].Name;
                let Value =Currency[i]._id;
                // dict[id] = Value;
                dictCurrency[Value] = id;
            }
            this.setState({
                dictCurrency,currencyData
            })

            // console.log(dictCurrency);
            // console.log(currencyData);
        }).catch(error=>{console.log(error)});

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption:selectedOption });
    };
    handelSubmit(e){
        e.preventDefault();
        let{dict,value}=this.state;
        // console.log(dict);console.log(value);console.log(typeof (dict)); console.log(this.state.value);console.log(ItemId);
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
        // let ItemId=getKeyByValue(dict,value);
        let ItemId=value;
        let LootBoxId=this.props.id;
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        let form = new FormData();
        form.append('ItemId', ItemId);
        form.append('LootBoxId', LootBoxId);
        form.append('Type', this.state.mainType[0]);
        // console.log('Type',);
        axios.post(`${Const.URL}admin/lootbox/items/add` ,form, {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            console.log(Description);
            if (Description==="d"){
                NotificationManager.success(
                    "Game Mode",
                    "Game Mode is add",
                    3000,
                    null,
                    null,
                    "success"
                );
                setTimeout(function(){  window.location.reload() }, 3000);

            }else if(Description[0]==="item already exist"){
                NotificationManager.error(
                    "cant add this item",
                    "item already exist",
                    3000,
                    null,
                    null,
                    "error"
                );
            }else if (Description[0]==="item not found"){
                NotificationManager.error(
                    "cant add this item",
                    "item not found",
                    3000,
                    null,
                    null,
                    "error"
                );
            }

        }).catch(error=>{console.log(error)});

    }
    currencySubmit(e){
        e.preventDefault();
        // this.setState({
        //     dictCurrency,currencyData
        // })
        let{dictCurrency,currencyValue}=this.state;
        // console.log(dict);console.log(value);console.log(typeof (dict)); console.log(this.state.value);console.log(ItemId);
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
        let ItemId=getKeyByValue(dictCurrency,currencyValue);
        let LootBoxId=this.props.id;

        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        let form = new FormData();
        form.append('ItemId', ItemId);
        form.append('LootBoxId', LootBoxId);
        form.append('Type', this.state.mainType[1]);



        axios.post(`${Const.URL}admin/lootbox/items/add` ,form, {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            console.log(Description);
            if (Description==="d"){
                NotificationManager.success(
                    "Game Mode",
                    "Game Mode is add",
                    3000,
                    null,
                    null,
                    "success"
                );
                setTimeout(function(){  window.location.reload() }, 3000);

            }else if(Description[0]==="item already exist"){
                NotificationManager.error(
                    "cant add this item",
                    "item already exist",
                    3000,
                    null,
                    null,
                    "error"
                );
            }else if (Description[0]==="item not found"){
                NotificationManager.error(
                    "cant add this item",
                    "item not found",
                    3000,
                    null,
                    null,
                    "error"
                );
            }

        }).catch(error=>{console.log(error)});

    }
    handelChange(e, value){
        // console.log("change value");
        // console.log(value);


            this.setState({value:value});


        if (value.length>0) {
            let headers = {
                'Id': `${Const.ID}`,
                'Token': `${Const.Token}`
            };
            axios.get(`${Const.URL}admin/gameitem/search/${value}`,{headers:headers}).then(responsive=>
            {
                const {Description} = responsive.data;
                // console.log(`https://resource.themaddays.com/admin/gameitem/search/${value}`);

                let index;let Device=[];
                let Data=JSON.parse(Description);

                for (index in Data){
                    Device.push({title:Data[index].Name ,id:Data[index]._id,Tag:Data[index].Tag,ChanceType:Data[index].ChanceType})
                }

                let dict = {};
                for (index in Data){
                    let id =Data[index].Name;
                    let Value =Data[index]._id;
                    dict[id] = Value;
                    // dict[Value] = id;
                }

                let DATA=[];
                Device.map(item => {
                    // DATA.push({name: item.title})
                    DATA.push({name: item.id})
                });
                this.setState({
                    Device,
                    DATA,dict,originalData:Data
                })

            }).catch(error=>{console.log(error)});
        }

        //
    }
    handleChangeSelect = (result, e) => {
        switch(e.name) {
            case "tagKind":
                this.setState({ tagKind:result ,changer:"tagKind"});
                break;

            default:
                this.setState({ chanceType:result ,changer:"chanceType" });
        }

    };
    CurrencyChange(e, currencyValue){
        this.setState({currencyValue});
    }






    render() {
        // Device:[], DATA:[],value:"n",dict:{},DefaultData:[],tagKind: "",chanceType:"",originalData:[]
        let {Device,DATA,DefaultData,dict,originalData,tagKind,chanceType} = this.state;
        // console.log("Device : ");
        // console.log(Device);
        // console.log("selectedOption"+this.state.selectedOption);
        // console.log("DATA : ");
        // console.log(DATA);
        // console.log("DefaultData : ");
        // console.log(DefaultData);
        // console.log("dict : ");
        // console.log(dict);
        // console.log("originalData : ");
        // console.log(+originalData);


       let rightData=[];let allData;

        if (tagKind!=="" && chanceType!==""){
            // console.log("both");
            allData=Device.filter(word => word.ChanceType === chanceType.value && word.Tag === tagKind.value);
            allData.map(item => {
                // rightData.push({name: item.title})
                rightData.push({name: item.id})
            });
            // console.log(rightData);

        }else if(tagKind!=="" || chanceType!==""){
            switch(this.state.changer) {
                case "tagKind":
                    // console.log("tagKind");
                    allData=Device.filter(word => word.Tag === tagKind.value);
                    allData.map(item => {
                        // rightData.push({name: item.title})
                        rightData.push({name: item.id})
                    });
                    // console.log(rightData);

                    break;
                case "chanceType":
                    // console.log("chanceType");
                    allData=Device.filter(word => word.ChanceType === chanceType.value);
                    allData.map(item => {
                        // rightData.push({name: item.title})
                        rightData.push({name: item.id})
                    });
                    // console.log(rightData);

                    break;
                default:
                    console.log("nothing ");
            }

        }else if (tagKind==="" && chanceType==="") {
            rightData=DATA;
        }

        // console.log(zero[0])


        // console.log(DATA,rightData);
        // console.log(rightData)
        return (
            <div >
                <Colxx xxs="12"  className="mb-5">
                    <label>
                        <IntlMessages id="form-components.state-single" />
                    </label>
                    <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.selectData}
                    />
                </Colxx>


                {

                    this.state.selectedOption.value===this.state.mainType[0]?
                        <form onSubmit={ this.handelSubmit.bind(this)}>
                            <div className="w-100 d-flex mt-2">
                                <Colxx xxs="12">
                                    <Card>
                                        <CardBody>
                                            <CardTitle>
                                                <IntlMessages id="Game Item" />
                                            </CardTitle>
                                            <FormGroup className="form-group has-float-label position-relative ">
                                                <label>
                                                    <IntlMessages id="Tag" />
                                                </label>
                                                <Select
                                                    components={{ Input: CustomSelectInput }}
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    name="tagKind"
                                                    value={this.state.tagKind}
                                                    onChange={this.handleChangeSelect}
                                                    options={options}
                                                />
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label position-relative ">
                                                <label>
                                                    <IntlMessages id="chanceType" />
                                                </label>
                                                <Select
                                                    components={{ Input: CustomSelectInput }}
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    name="chanceType"
                                                    value={this.state.chanceType}
                                                    onChange={this.handleChangeSelect}
                                                    options={options2}
                                                />
                                            </FormGroup>

                                            <div >
                                                <FormGroup className="form-group has-float-label position-relative ">
                                                    <Label>
                                                        <IntlMessages id="item name" />
                                                    </Label>
                                                    {
                                                            <AutoSuggestEdit
                                                                placeholder={"type item name"}
                                                                data={rightData}
                                                                onChange={value => this.handelChange(this, value)}

                                                            />
                                                    }
                                                </FormGroup>

                                            </div>
                                            <button className="btn btn-success col-2 ml-2 mb-2" >submit</button>

                                        </CardBody>

                                    </Card>
                                </Colxx>
                            </div>
                        </form>
                        :

                        <form onSubmit={ this.currencySubmit.bind(this)}>
                            <div className="w-100 d-flex mt-2">
                                <Colxx xxs="12">
                                    <Card>
                                        <CardBody>
                                            <CardTitle>
                                                <IntlMessages id="Game Currency" />
                                            </CardTitle>

                                            <div >
                                                <FormGroup className="form-group has-float-label position-relative ">
                                                    <Label>
                                                        <IntlMessages id="item name" />
                                                    </Label>
                                                    {
                                                        <AutoSuggestEdit
                                                            placeholder={"type item name"}
                                                            data={this.state.currencyData}
                                                            onChange={value => this.CurrencyChange(this, value)}

                                                        />
                                                    }
                                                </FormGroup>

                                            </div>
                                            <button className="btn btn-success col-2 ml-2 mb-2" >submit</button>

                                        </CardBody>

                                    </Card>
                                </Colxx>
                            </div>
                        </form>
                }
            </div>
        );
    }
}

export default AddItemInLootBox;