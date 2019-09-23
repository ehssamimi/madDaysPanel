import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
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
import loader from '../../../assets/6.gif'
import {
    FormikCustomRadioGroup,
    FormikReactSelect,
} from "../../../../containers/form-validations/FormikFields";
import {TweenMax} from "gsap/TweenMax";
import * as Const from "../../../Const";


const SignupSchema = Yup.object().shape({

    // Body ['Name', "Price","ImageUrl", "IsActive"]
    Name: Yup.string()
        .required("ChanceType is required!"),
    Price: Yup.number()
        .required("ChanceType is required!"),
    ImageUrl: Yup.string()
        .required("ChanceType is required!"),
    LootBoxType: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("LootBoxType is required!"),



});

const options2 = [
    { value: "True", label: "True" },
    { value: "False", label: "False" }
];
var classNames = require('classnames');
class FromAddLootBox extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:false,  LoaderClass:[],options:[]
        }
    }
    componentDidMount(){
        TweenMax.staggerFrom( '.rowInput', 1, {autoAlpha:0, y: 100} ,0.1)﻿﻿﻿
        this.setState({
            LoaderClass:classNames({'loaderBackground': !this.state.loaderActive})
        })

        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        axios.get(`${Const.URL}admin/lootbox/types`,{headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            let Data=JSON.parse(Description);
            let selectData=[];
           let i;
            for (i in Data ) {
                selectData.push({
                    label:Data[i],value:Data[i],key:i
                })
            }
            this.setState({
                options:selectData
            })
            // console.log(selectData)
            // console.log(dictCurrency);
            // console.log(currencyData);
        }).catch(error=>{console.log(error)});


    }



    handleSubmit = (values, { setSubmitting }) => {
        this.setState({
            loaderActive:true
        });
        const payload = {
            ...values,
            LootBoxType: values.LootBoxType.value
            // Names: values.Names.value,
        };
        console.log(payload);
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        let form = new FormData();
        form.append('Name', payload.Name);
        form.append('Price', payload.Price);
        form.append('ImageUrl', payload.ImageUrl);
        form.append('IsActive', payload.Active);
        form.append('LootBoxType', payload.LootBoxType);
               axios.post(`${Const.URL}admin/lootbox/add` ,form, {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            if (Description.Id){
                this.setState({
                    loaderActive:false
                });
                NotificationManager.success(
                    "Congratulations",
                    "add loot box",
                    3000,
                    null,
                    null,
                    "success"
                );
                // setTimeout(function () {
                //     window.location.reload()
                // }, 3000);
            }

            // console.log(Description)
            // console.log(Description.Id)

        }).catch(error=>{console.log(error)});
    }


    render() {
        let{LoaderClass,loaderActive}=this.state;
        return (
            <div>
                {loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
                    <Row className="mb-4">
                        <Colxx xxs="12" >
                            {/*<Card className={LoaderClass}>*/}
                            <Card >
                                <CardBody>
                                    <CardTitle>
                                        <IntlMessages id="Loot Box" />
                                    </CardTitle>
                                    {/*// Body ['Name', "Price","ImageUrl", "IsActive"]*/}

                                    <Formik
                                        initialValues={{
                                            Name: "House",
                                            Price: 0,
                                            ImageUrl: "img-url",
                                            // LootBoxType: this.state.options[0],

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
                                                    <div className="col-sm-6 rowInput">
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
                                                            <Field className="form-control" name="Price" type="number"/>
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
                                                    <div className="col-sm-6 rowInput">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="LootBoxType" />
                                                            </Label>
                                                            <FormikReactSelect
                                                                name="LootBoxType"
                                                                id="LootBoxType"
                                                                value={values.LootBoxType}
                                                                options={this.state.options}
                                                                onChange={setFieldValue}
                                                                onBlur={setFieldTouched}
                                                            />
                                                            {errors.LootBoxType && touched.LootBoxType ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.LootBoxType}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
                                                </div>

                                                <div className="col-sm-5 rowInput">
                                                    <FormGroup className="error-l-175">
                                                        <Label className="d-block">Active</Label>
                                                        <FormikCustomRadioGroup
                                                            inline
                                                            name="Active"
                                                            id="Active"
                                                            label="Which of these?"
                                                            value={values.Active}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                            options={options2}
                                                        />
                                                        {errors.Active && touched.Active ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Active}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
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

export default FromAddLootBox;