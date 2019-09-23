import React, {Component} from 'react'
import { Formik, Form, Field } from "formik";
import * as Const from './../../../Const'
import * as Yup from "yup";
import axios from "axios";

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
import {FormikReactSelect} from "../../../../containers/form-validations/FormikFields";
import {TweenMax} from "gsap/TweenMax";
import loader from "../../../assets/6.gif";


const SignupSchema = Yup.object().shape({
    Price: Yup.number()
        .required("Price is required!"),

    TypeKind: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("TypeKind is required!"),
    ChanceType: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("ChanceType is required!"),
    Value: Yup.number()
        .required("Value is required!"),
    ImageUrl: Yup.string()
        .required("ImageUrl is required!"),
    SKU: Yup.string()
        .required("SKU is required!"),
    Name: Yup.string()
        .required("ImageUrl is required!"),

});

const options = [
    { value: "Coin", label: "Coin" },
    { value: "GoldenCoin", label: "GoldenCoin" }
];
const NameOption = [
    { value: "FaceSkin", label: "FaceSkin" },
    { value: "NeckSkin", label: "NeckSkin" },
    { value: "HairSkin", label: "HairSkin" },
    { value: "BeardSkin", label: "BeardSkin" },
    { value: "HatSkin", label: "HatSkin" },
    { value: "UpperBodySkin", label: "UpperBodySkin" },
    { value: "legsSkin", label: "legsSkin" },
    { value: "ShoesSkin", label: "ShoesSkin" },
    { value: "MelleSkin", label: "MelleSkin" },
    { value: "Armlet", label: "Armlet" },
    { value: "Avatar", label: "Avatar" },
];
// const options2 = [
//     { value: "sasi", label: "sasi" },
//     { value: "esi", label: "esi" }
// ];
class FormGameCurrency extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:false,ChanceTypeOption:[]
        }

    }
    componentDidMount(){

        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };

        axios.get(`${Const.URL}admin/gameitem/chancetype/get` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;

            let DES=JSON.parse(Description);
            // console.log(DES)
            // this.props.inprogress(DES);x
            console.log(Description);
            let keys=Object.keys(DES);let i;let ChanceTypeOption=[];

            for(i in keys){
                let row={ value:keys[i], label: keys[i] };
                ChanceTypeOption.push(row);
            }
            this.setState({
                ChanceTypeOption
            });
            console.log(ChanceTypeOption)

        }).catch(error=>{console.log(error)});
        TweenMax.staggerFrom( '.rowInput', 1, {autoAlpha:0, y: 100} ,0.1);﻿﻿﻿
    }




    handleSubmit = (values, { setSubmitting }) => {
        this.setState({
            loaderActive:true
        });
        const payload = {
            ...values,
            TypeKind: values.TypeKind.value,
            ChanceType: values.ChanceType.value,
            // Name: values.Name.value,
            // Names: values.Names.value,
        };
        console.log(payload);

        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };



        let form = new FormData();
        form.append('Type', payload.TypeKind);
        form.append('Price', payload.Price);
        form.append('Value', payload.Value);
        form.append('ImageUrl', payload.ImageUrl);
        form.append('SKU', payload.SKU);
        form.append('Name', payload.Name);
        form.append('ChanceType', payload.ChanceType);
        axios.post(`${Const.URL}admin/ingamecurrency/add` ,form, {headers:headers}).then(responsive=>
        {
            this.setState({
                loaderActive:false
            });
            const {Description}=responsive.data;
            if(Description === "add"){
                NotificationManager.success(
                    "congratulation",
                    "your game Currency added",
                    3000,
                    null,
                    null,
                    "success"
                );
            }else {
                NotificationManager.error(
                    " new game currency didnt add",
                    Description,
                    3000,
                    null,
                    null,
                    "success"
                );
            }

            // let DES=JSON.parse(Description);
            // this.props.inprogress(DES);x
            console.log(Description)
        }).catch(error=>{
            this.setState({
                loaderActive:false
            });
            console.log(error)});


    };





    render() {
        let{ChanceTypeOption}=this.state;
        return (
            <div>
                {
                    this.state.loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
                        <Row className="mb-4">
                            <Colxx xxs="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <IntlMessages id="Game Currency" />
                                        </CardTitle>

                                        <Formik
                                            initialValues={{
                                                Price: 0,
                                                Value: 1,
                                                ImageUrl: "img-url",
                                                SKU: '',
                                                Name: "Hny",
                                                TypeKind: { value: "Coin", label: "Coin" },
                                                ChanceType: { value: "Rare", label: "Rare" },
                                                // Name: { value: "FaceSkin", label: "FaceSkin" },
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
                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-6">
                                                            <FormGroup className="form-group has-float-label">
                                                                <Label>
                                                                    <IntlMessages id="TypeKind" />
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="TypeKind"
                                                                    id="TypeKind"
                                                                    value={values.TypeKind}
                                                                    options={options}
                                                                    onChange={setFieldValue}
                                                                    onBlur={setFieldTouched}
                                                                />
                                                                {errors.TypeKind && touched.TypeKind ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.TypeKind}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="ChanceType" />
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="ChanceType"
                                                                    id="ChanceType"
                                                                    value={values.ChanceType}
                                                                    options={ChanceTypeOption}
                                                                    onChange={setFieldValue}
                                                                    onBlur={setFieldTouched}
                                                                />
                                                                {errors.ChanceType && touched.ChanceType ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.ChanceType}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>

                                                        </div>
                                                    </div>
                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-6  ">
                                                            {/*<FormGroup className="form-group has-float-label position-relative">*/}
                                                                {/*<Label>*/}
                                                                    {/*<IntlMessages id="Name" />*/}
                                                                {/*</Label>*/}
                                                                {/*<FormikReactSelect*/}
                                                                    {/*name="Name"*/}
                                                                    {/*id="Name"*/}
                                                                    {/*value={values.Name}*/}
                                                                    {/*options={NameOption}*/}
                                                                    {/*onChange={setFieldValue}*/}
                                                                    {/*onBlur={setFieldTouched}*/}
                                                                {/*/>*/}
                                                                {/*{errors.Name && touched.Name ? (*/}
                                                                    {/*<div className="invalid-feedback d-block">*/}
                                                                        {/*{errors.Name}*/}
                                                                    {/*</div>*/}
                                                                {/*) : null}*/}
                                                            {/*</FormGroup>*/}
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
                                                        <div className="col-sm-6 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="Price" />
                                                                </Label>
                                                                <Field className="form-control" name="Price" type="number"  />
                                                                {errors.Price && touched.Price ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.Price}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>


                                                        </div>
                                                    </div>
                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-6 rowInput">
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
                                                        <div className="col-sm-6 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="Value" />
                                                                </Label>
                                                                <Field className="form-control" name="Value"  type="number" />
                                                                {errors.Value && touched.Value ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.Value}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                    </div>

                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-12 rowInput">
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





                                                    <Button color="primary" type="submit" className="col-2 rowInput">
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

export default FormGameCurrency;