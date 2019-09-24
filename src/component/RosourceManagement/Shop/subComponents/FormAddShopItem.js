import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "react-select";
import loader from '../../../assets/6.gif'



import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import {
    FormikReactSelect,
    } from "../../../../containers/form-validations/FormikFields";
import AutoSuggestEdit from "../../test/AutoSuggestEdit";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import {TweenMax} from "gsap/TweenMax";
import FormShowRowGameItem from "../FormShowRowGameItem";
import * as Const from "../../../Const";

const SignupSchema = Yup.object().shape({
    Cost: Yup.number()
        .required("Cost is required!"),

    ShopItem: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("ShopItem is required!"),
    CostType: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("CostType is required!"),
    ShopType: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("ShopType is required!"),
    // Value: Yup.string()
    //     .required("Value is required!"),
    ImageUrl: Yup.string()
        .required("ImageUrl is required!"),
    SKU: Yup.string()
        .required("Value is required!"),
    Name: Yup.string()
        .required("ImageUrl is required!"),

});

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
class FormAddShopItem extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            Device:[], DATA:[],value:"n",dict:{},DefaultData:[],tagKind: "",chanceType:"",originalData:[],changer:"",
            rightData:[],itemListId:[],itemList:[],loaderActive:true
        }
    }
    componentDidMount(){
        TweenMax.staggerFrom( '.rowInput', 1, {autoAlpha:0, y: 100} ,0.1)﻿﻿﻿

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
            console.log(Data);
            for (index in Data){
                Device.push({title:Data[index].Name ,id:Data[index]._id,Tag:Data[index].Tag,ChanceType:Data[index].ChanceType,Key:Data[index].Key})
            }
            const result = Data.filter(word => word.Tag ==="Male");
            console.log(result);
            console.log(Device);

            let dict = {};
            for (index in Data){
                let id =Data[index].Key;
                let Value =Data[index]._id;
                // dict[id] = Value;
                dict[Value] = id;
            }
            let DATA=[];
            console.log("Device");
            console.log(Device);

            Device.map(item => {
                // DATA.push({name: item.title})
                DATA.push({name: item.Key})
            });
            this.setState({
                Device,
                DATA,dict,DefaultData:DATA,originalData:Data
            });

            console.log(this.state.DATA);

        }).catch(error=>{console.log(error)});



    }
    handelChange(e, value){
        console.log('value '+value);
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
                console.log('Data')
                console.log(Data)

                for (index in Data){
                    Device.push({title:Data[index].Name ,id:Data[index]._id,Tag:Data[index].Tag,ChanceType:Data[index].ChanceType,Key:Data[index].Key})
                }

                let dict = {};
                       let {itemList}=this.state;
                for (index in itemList){
                    let id =itemList[index].Key;
                    let Value =itemList[index]._id;
                    // dict[id] = Value;
                    dict[Value] = id;
                }
                console.log("Device");
                console.log(Device);

                let DATA=[];
                Device.map(item => {
                    // DATA.push({name: item.title})
                    DATA.push({name: item.Key})
                });
                this.setState({
                    Device,
                    DATA,dict,originalData:Data
                },()=>{
                    console.log('originalData');
                    console.log(this.state.originalData);
                })

            }).catch(error=>{console.log(error)});
        }

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
    handelSubmitGameItem(){
        let{value,originalData}=this.state;
        console.log("add some item list");
        console.log(originalData);
     //
     console.log("originalData");
     console.log(originalData);
        // let itemList=[];
        // itemList.push(originalData[0]);
        this.setState({
            itemList:[ ...this.state.itemList, originalData[0]],
        }, () => {

            let {itemList}=this.state;
            function getKeyByValue(object, value) {
                return Object.keys(object).find(key => object[key] === value);
            }

            let dict = {};let Names=[];let ItemId=[];
            let i,j;
            console.log(itemList);

            // for (i in itemList){
            //     let id =itemList[i].Name;
            //     let Value =itemList[i]._id;
            //     let Name=itemList[i].Name;
            //     Names.push(Name);
            //     dict[Value] = id;
            // }
            // console.log("Names");
            // console.log(Names);
            // for (j in Names){
            //     let itm=getKeyByValue(dict,Names[j]);
            //     ItemId.push(itm);
            // }

            for (i in itemList){
                let Value =itemList[i]._id;

                ItemId.push(Value)
            }
            //
            console.log(ItemId);
            this.setState({
                dict,ItemId
            });
            // console.log("add");
            // console.log(this.state.itemList);
            // console.log(this.state.ItemId);console.log(dict);

        });



    }
    handelClick(index){
        // console.log("delete sasas")
        let lootBoxInfo=this.state.itemList[index];
        let {itemList}=this.state;
        console.log(itemList);
        // delete itemList[index];
        itemList.splice(index, 1);
        // console.log(itemList);
        // console.log(this.state.dict);
        let dict = {};let Names=[];let ItemId=[];
        let i,j;
        // for (i in itemList){
        //     let id =itemList[i].Name;
        //     let Value =itemList[i]._id;
        //     let Name=itemList[i].Name;
        //     Names.push(Name);
        //     dict[Value] = id;
        // }
        // console.log(Names);
        // function getKeyByValue(object, value) {
        //     return Object.keys(object).find(key => object[key] === value);
        // }
        // for (j in Names){
        //     let itm=getKeyByValue(dict,Names[j]);
        //     ItemId.push(itm);
        // }
        for (i in itemList){
            let Value =itemList[i]._id;
            ItemId.push(Value)
        }

        console.log(ItemId);



        this.setState({
            itemList,dict,ItemId
        });


    }
    handleSubmit = (values, { setSubmitting }) => {
        this.setState({
            loaderActive:true
        });
        const payload = {
            ...values,
            ShopItem: values.ShopItem.value,
            CostType: values.CostType.value,
            ShopType: values.ShopType.value

        };
        console.log(payload);
        console.log(this.state.value);

        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        let{dict,value,ItemId}=this.state;
        // console.log(dict);
        let arr = [{'Cost': payload.Cost},{'ImageUrl':payload.ImageUrl},{'SKU':payload.SKU},{'Name':payload.Name},{'ShopItemType':payload.ShopType},{'CostType':payload.CostType}
            ,{'Type':payload.ShopItem},{'GameItemList':[ItemId]}];
        var string;
        if(ItemId!==undefined){
             string =ItemId.join(",");
        }else{
             string ='';
        }
        console.log("string: ");
        console.log(string);
        console.log(arr);

        let form = new FormData();
        form.append('Cost', payload.Cost);
        form.append('ImageUrl', payload.ImageUrl);
        form.append('SKU', payload.SKU);
        form.append('Name', payload.Name);
        form.append('ShopItemType', payload.ShopType);
        form.append('CostType', payload.CostType);
        form.append('Type', payload.ShopItem);
        form.append('GameListItem', string);
        axios.post(`${Const.URL}admin/shop/items/add` ,form, {headers:headers}).then(responsive=>
        {
            this.setState({
                loaderActive:false
            });
            const {Description}=responsive.data;
            console.log('Description');
            console.log(Description);

            if(Description === "d"){
                NotificationManager.success(
                    "congratulation",
                    "add shop item",
                    3000,
                    null,
                    null,
                    "success"
                );
                // let DES=JSON.parse(Description);
                // this.props.inprogress(DES);x
                console.log(Description)
            }

        }).catch(error=>{console.log(error)});
    };
    componentWillReceiveProps(props){
        if (props.CostskeysTypeOption.length>0){
            this.setState({
                loaderActive:false
            })
        }
    }

      render() {
        // let {Device,DATA,DefaultData} = this.state;


        let{ShopItemTypeOption,CostskeysTypeOption,ShopTypeOption}=this.props;
        // console.log(CostskeysTypeOption);


        let {Device,DATA,DefaultData,dict,originalData,tagKind,chanceType,itemList,loaderActive} = this.state;
        // console.log("Device : ");
        // console.log(Device);
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
            allData=Device.filter(word => word.ChanceType === chanceType.value && word.Tag === tagKind.value)
            allData.map(item => {
                rightData.push({name: item.Key})
            });
            // console.log(rightData);

        }else if(tagKind!=="" || chanceType!==""){
            switch(this.state.changer) {
                case "tagKind":
                    // console.log("tagKind");
                    allData=Device.filter(word => word.Tag === tagKind.value);
                    allData.map(item => {
                        rightData.push({name: item.Key})
                    });
                    // console.log(rightData);

                    break;
                case "chanceType":
                    // console.log("chanceType");
                    allData=Device.filter(word => word.ChanceType === chanceType.value);
                    allData.map(item => {
                        rightData.push({name: item.Key})
                    });
                    // console.log(rightData);

                    break;
                default:
                    console.log("nothing ");
            }

        }else if (tagKind==="" && chanceType==="") {
            rightData=DATA;
        }
        console.log("DATA")
        console.log(DATA)
          console.log("itemList")
        console.log(itemList)
            // console.log(CostskeysTypeOption,loaderActive);


        // console.log(ShopItemTypeOption,CostskeysTypeOption,ShopTypeOption)
        return (
            <div>
                {
                    loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
                        <Row className="mb-4">
                            <Colxx xxs="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <IntlMessages id="Shop" />
                                        </CardTitle>

                                        <Formik
                                            initialValues={{
                                                Cost: 0,
                                                ImageUrl: "img-url",
                                                SKU: "sku?WDF",
                                                Name: "Hny",
                                                ShopItem: { value: "SpecialOffer", label: "SpecialOffer"},
                                                CostType: { value: "InGame", label: "InGame" },
                                                ShopType: { value: "Cool", label: "Cool" },
                                            }}
                                            validationSchema={SignupSchema}
                                            onSubmit={this.handleSubmit}
                                        >
                                            {({
                                                  handleSubmit,
                                                  setFieldValue,
                                                  setFieldTouched,
                                                  handleChange,
                                                  handleBlur,
                                                  values,
                                                  errors,
                                                  touched,
                                                  isSubmitting
                                              }) => (
                                                <Form className="av-tooltip tooltip-label-bottom">
                                                    <div className="w-100  ">
                                                        <div className="col-md-4 col-sm-12 float-left">
                                                            <FormGroup className="form-group has-float-label">
                                                                <Label>
                                                                    <IntlMessages id="CostType" />
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="CostType"
                                                                    id="CostType"
                                                                    value={values.CostType}
                                                                    options={CostskeysTypeOption}
                                                                    onChange={setFieldValue}
                                                                    onBlur={setFieldTouched}
                                                                />
                                                                {errors.CostType && touched.CostType ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.CostType}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-md-4 col-sm-12 float-left">
                                                            <FormGroup className="form-group has-float-label">
                                                                <Label>
                                                                    <IntlMessages id="ShopItem" />
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="ShopItem"
                                                                    id="ShopItem"
                                                                    value={values.ShopItem}
                                                                    options={ShopTypeOption}
                                                                    onChange={setFieldValue}
                                                                    onBlur={setFieldTouched}
                                                                />
                                                                {errors.ShopItem && touched.ShopItem ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.ShopItem}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-md-4 col-sm-12 float-left">
                                                            <FormGroup className="form-group has-float-label">
                                                                <Label>
                                                                    <IntlMessages id="ShopType" />
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="ShopType"
                                                                    id="ShopType"
                                                                    value={values.ShopType}
                                                                    options={ShopItemTypeOption}
                                                                    onChange={setFieldValue}
                                                                    onBlur={setFieldTouched}
                                                                />
                                                                {errors.ShopType && touched.ShopType ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.ShopType}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                    </div>

                                                    <div className="w-100  ">
                                                        <div className=" col-sm-12 col-md-6 float-left rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="Name" />
                                                                </Label>
                                                                <Field className="form-control" name="Name"  />
                                                                {errors.Name && touched.Name ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.Name}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 float-left rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="ImageUrl" />
                                                                </Label>
                                                                <Field className="form-control" name="ImageUrl" />
                                                                {errors.ImageUrl && touched.ImageUrl ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.ImageUrl}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                    </div>

                                                    <div className="w-100  ">
                                                        <div className="col-sm-12 col-md-6 float-left rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="SKU" />
                                                                </Label>
                                                                <Field className="form-control" name="SKU"  />
                                                                {errors.SKU && touched.SKU ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.SKU}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 float-left rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="Cost" />
                                                                </Label>
                                                                <Field className="form-control" name="Cost" type="number" />
                                                                {errors.Cost && touched.Cost ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.Cost}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>

                                                    </div>

                                                        {
                                                            itemList.length>0?itemList.map((todo ,index)=><FormShowRowGameItem order={todo} index={index} key={index}  handelClick={this.handelClick.bind(this, index)}/> ):""
                                                            // this.state.itemList.length?this.state.itemList.map((order, index):" "
                                                        }

                                                    {/*<RowEachItem order={order} index={index} key={index} index={index} id={id}/>*/}
                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-12 rowInput">

                                                            <Card>
                                                                <CardBody>

                                                                    <CardTitle>
                                                                        <IntlMessages id="Game Item" />
                                                                    </CardTitle>

                                                                    <div className="col-6 float-right ">
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
                                                                    </div>
                                                                    <div className="col-6 float-right">
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
                                                                    </div>
                                                                    <div className="clearfix"></div>



                                                                    <div className="col-12 ">
                                                                        <FormGroup className="form-group has-float-label position-relative ">
                                                                            <Label>
                                                                                <IntlMessages id="item name" />
                                                                            </Label>
                                                                            {
                                                                                <AutoSuggestEdit
                                                                                    placeholder={"type item name"}
                                                                                    data={rightData}
                                                                                    onChange={value => this.handelChange(this, value ||'n')}

                                                                                />
                                                                            }
                                                                        </FormGroup>

                                                                    </div>
                                                                    <Button color="success" className="col-2 rowInput float-right" onClick={this.handelSubmitGameItem.bind(this)}>
                                                                        ADD
                                                                    </Button>
                                                                </CardBody>

                                                            </Card>





                                                            {/*<FormGroup className="form-group has-float-label position-relative">*/}
                                                            {/*<Label>*/}
                                                            {/*<IntlMessages id="item Name" />*/}
                                                            {/*</Label>*/}
                                                            {/*{*/}
                                                            {/*DATA.length>0?*/}
                                                            {/*<AutoSuggestEdit*/}
                                                            {/*placeholder={"type item name"}*/}
                                                            {/*data={DATA}*/}

                                                            {/*// onChange={value => {*/}
                                                            {/*//     // console.log(value)*/}
                                                            {/*//     this.setState({*/}
                                                            {/*//         value*/}
                                                            {/*//     })*/}
                                                            {/*// }}*/}
                                                            {/*// onChange={value => {}}*/}
                                                            {/*onChange={value => this.handelChange(this, value)}*/}
                                                            {/*// onChange={value => {}}*/}

                                                            {/*/>: DefaultData.length>0?     <AutoSuggestEdit*/}
                                                            {/*placeholder={"type item name"}*/}
                                                            {/*data={DefaultData}*/}

                                                            {/*// onChange={value => {*/}
                                                            {/*//     // console.log(value)*/}
                                                            {/*//     this.setState({*/}
                                                            {/*//         value*/}
                                                            {/*//     })*/}
                                                            {/*// }}*/}
                                                            {/*// onChange={value => {}}*/}
                                                            {/*// onChange={value => this.handelChange(this, value)}*/}
                                                            {/*onChange={value => {}}*/}

                                                            {/*/>:""*/}
                                                            {/*}*/}

                                                            {/*</FormGroup>*/}








                                                        </div>

                                                    </div>
                                                    <Button color="primary" type="submit" className="col-2 rowInput float-right">
                                                        Submit
                                                    </Button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </CardBody>
                                </Card>
                            </Colxx>
                        </Row>
                }




            </div>
        );
    }
}

export default FormAddShopItem;