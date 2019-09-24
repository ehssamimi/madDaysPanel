import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {TweenLite, TweenMax} from "gsap/TweenMax";

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
    FormikDatePicker,
    FormikReactSelect,
    FormikTagsInput
} from "../../../../containers/form-validations/FormikFields";
import * as Const from "../../../Const";
import loader from "../../../assets/6.gif";
const SignupSchema = Yup.object().shape({

    ChanceType: Yup.string()
        .required("ChanceType is required!"),

    TagKind: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("TagKind is required!"),
    ItemType: Yup.string()
        .required("ItemType is required!"),
    ImageUrl: Yup.string()
        .required("ImageUrl is required!"),
    KeyItem: Yup.string()
        .required("Key is required!"),
    Name: Yup.string()
        .required("Name is required!"),

});

const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Both", label: "Both" },
    { value: "Gun", label: "Gun" }
];
// const options2 = [
//     { value: "Common", label: "Common" },
//     { value: "Rare", label: "Rare" },
//     { value: "Epic", label: "Epic" },
//     { value: "Legendery", label: "Legendery" }
// ];
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



class FormGameItem extends Component {
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
            TagKind: values.TagKind.value,
            ChanceType: values.ChanceType.value,
            Name: values.Name.value,
        };
        console.log(payload);
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        let form = new FormData();
        form.append('Tag', payload.TagKind);
        form.append('ChanceType', payload.ChanceType);
        form.append('ItemType', payload.ItemType);
        form.append('ImageUrl', payload.ImageUrl);
        form.append('Key', payload.KeyItem);
        form.append('Name', payload.Name);
        axios.post(`${Const.URL}admin/gameitem/add` ,form, {headers:headers}).then(responsive=>
        {
            this.setState({
                loaderActive:false
            });
            const {Description}=responsive.data;
            if (Description === "D"){
                NotificationManager.success(
                    "congratulation",
                    "game item added",
                    3000,
                    null,
                    null,
                    "success"
                );
            }else {
                NotificationManager.error(
                    " new game item didnt add",
                    Description,
                    3000,
                    null,
                    null,
                    "success"
                );
            }
            // setTimeout(function () {
            //     window.location.reload()
            // }, 3000);
            // setTimeout(function(){ window.location.reload(); }, 3000);
            // console.log(Description)
        }).catch(error=>{console.log(error)});
    }





    render() {
        return (
            <div>
                {
                    this.state.loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
                        <Row className="mb-4">
                            <Colxx xxs="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <IntlMessages id="Game Item" />
                                        </CardTitle>

                                        <Formik
                                            initialValues={{
                                                KeyItem: "House",
                                                ItemType: "ShotGun",
                                                ImageUrl: "img-url",
                                                ChanceType: {value: "Common",label: "Common"},
                                                // Name: "Hny",
                                                TagKind: {value: "Male",label: "Male"},
                                                Name: { value: "FaceSkin", label: "FaceSkin" },

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
                                                        <div className="col-sm-6 ">
                                                            <FormGroup className="form-group has-float-label">
                                                                <Label>
                                                                    <IntlMessages id="TagKind" />
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="TagKind"
                                                                    id="TagKind"
                                                                    value={values.TagKind}
                                                                    options={options}
                                                                    onChange={setFieldValue}
                                                                    onBlur={setFieldTouched}
                                                                />
                                                                {errors.TagKind && touched.TagKind ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.TagKind}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-6 ">

                                                            <FormGroup className="form-group has-float-label">
                                                                <Label>
                                                                    <IntlMessages id="ChanceType" />
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="ChanceType"
                                                                    id="ChanceType"
                                                                    value={values.ChanceType}
                                                                    options={this.state.ChanceTypeOption}
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
                                                        <div className="col-sm-6 ">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="Name"/>
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="Name"
                                                                    id="Name"
                                                                    value={values.Name}
                                                                    options={NameOption}
                                                                    onChange={setFieldValue}
                                                                    onBlur={setFieldTouched}
                                                                />
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
                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-6 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="KeyItem" />
                                                                </Label>
                                                                <Field className="form-control" name="KeyItem"  />
                                                                {errors.KeyItem && touched.KeyItem ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.KeyItem}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-6 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="ItemType" />
                                                                </Label>
                                                                <Field className="form-control" name="ItemType"  />
                                                                {errors.ItemType && touched.ItemType ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.ItemType}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                            {/*<FormGroup className="form-group has-float-label position-relative">*/}
                                                            {/*<Label>*/}
                                                            {/*<IntlMessages id="Name" />*/}
                                                            {/*</Label>*/}
                                                            {/*<Field className="form-control" name="Name" />*/}
                                                            {/*{errors.Name && touched.Name ? (*/}
                                                            {/*<div className="invalid-feedback d-block">*/}
                                                            {/*{errors.Name}*/}
                                                            {/*</div>*/}
                                                            {/*) : null}*/}
                                                            {/*</FormGroup>*/}
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

export default FormGameItem;