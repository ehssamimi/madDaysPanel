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
import {FormikCustomRadioGroup} from "../../../../containers/form-validations/FormikFields";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import loader from "../../../../component/assets/6.gif";
// import{id,token} from './../../../../const'
import * as Const from './../../../../component/Const'


const SignupSchema = Yup.object().shape({
    Kill: Yup.number()
        .required("Kill number is required!"),
    MatchType: Yup.string()
        .required("MatchType is required!"),
    MatchName: Yup.string()
        .required("MatchName is required!"),
    ImageUrl: Yup.string()
        .required("MatchName is required!"),
    Scene: Yup.string()
        .required("Scene is required!"),
    MatchTime: Yup.number()
        .required("MatchTime number is required!"),
    Price: Yup.number()
        .required("Price number is required!"),
    EXP: Yup.number()
        .required("Price number is required!"),
    MaxPlayers: Yup.number()
        .required("Price number is required!"),
});

const options = [
    { value: "True", label: "True" },
    { value: "False", label: "False" }
];

class FormGameMode extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:false
        }
    }
    componentDidMount(){
        TweenMax.staggerFrom( '.rowInput', 1, {autoAlpha:0, y: 100} ,0.1);﻿﻿﻿

    }

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({
            loaderActive:true
        });
        const payload = {
            ...values,
            state: values.state.value
        };

        // localStorage.setItem('TokenGameHandmade',"a698d224f32b856f7b066792ca544b875a28478081af5e049f834bfa3d995179");
        // localStorage.setItem('IdGameHandmade', "5d1870f09d79a3cc6e224e59");
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        console.log(payload);
        console.log(payload.Active);

        //
        let form = new FormData();
        form.append('Active', payload.Active);
        form.append('MatchType', payload.MatchType);
        form.append('Kill', payload.Kill);
        form.append('MatchTime', payload.MatchTime);
        form.append('Price', payload.Price);
        form.append('ImageUrl', payload.ImageUrl);
        form.append('MaxPlayers', payload.MaxPlayers);
        form.append('MatchName', payload.MatchName);
        form.append('EXP', payload.EXP);
        form.append('Scene', payload.Scene);
        console.log(form);
        axios.post(`${Const.URL}admin/modes/add`, form, {headers: headers}).then(responsive => {
            const {Description} = responsive.data;

            this.setState({
                loaderActive: false
            });
            if (Description === "D") {
                NotificationManager.success(
                    "Success",
                    "Game Mode is add",
                    3000,
                    null,
                    null,
                    "success"
                );
            } else {
                NotificationManager.error(
                    "Error",
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
        }).catch(error => {
            this.setState({
                loaderActive: false
            });
            console.log(error)
        });

    };
    render() {

        return (
            <div>
                {
                   this.state.loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
                        <Row className="mb-4" style={{fontSize:16+'px'}}>
                            <Colxx xxs="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <IntlMessages id="Game-Mode" />
                                        </CardTitle>

                                        <Formik
                                            initialValues={{

                                                MatchType: "TimeTrial",
                                                MatchName:"TimeTrial Silver",
                                                ImageUrl:"TimeTrial",
                                                Scene:"city",
                                                Kill: 0,
                                                MatchTime: 190,
                                                Price: 245,
                                                EXP: 0,
                                                MaxPlayers: 2,
                                                state: {}
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
                                                <Form className="av-tooltip tooltip-label-bottom d-flex col-12 flex-column">
                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-6 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="MatchType" />
                                                                </Label>
                                                                <Field className="form-control" name="MatchType"  />
                                                                {errors.MatchType && touched.MatchType ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.MatchType}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-6 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="MatchName" />
                                                                </Label>
                                                                <Field className="form-control" name="MatchName"  />
                                                                {errors.MatchName && touched.MatchName ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.MatchName}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>


                                                    </div>
                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-4 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="Kill" />
                                                                </Label>
                                                                <Field className="form-control" name="Kill"  type="number"/>
                                                                {errors.Kill && touched.Kill ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.Kill}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-4 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="MatchTime" />
                                                                </Label>
                                                                <Field className="form-control" name="MatchTime"  type="number"/>
                                                                {errors.MatchTime && touched.MatchTime ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.MatchTime}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-4 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="Price" />
                                                                </Label>
                                                                <Field className="form-control" name="Price"  type="number"/>
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
                                                                    <IntlMessages id="EXP" />
                                                                </Label>
                                                                <Field className="form-control" name="EXP"  type="number"/>
                                                                {errors.EXP && touched.EXP ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.EXP}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-6 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="MaxPlayers" />
                                                                </Label>
                                                                <Field className="form-control" name="MaxPlayers"  type="number"/>
                                                                {errors.MaxPlayers && touched.MaxPlayers ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.MaxPlayers}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className="w-100 d-flex ">
                                                        <div className="col-sm-4 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="ImageUrl" />
                                                                </Label>
                                                                <Field className="form-control" name="ImageUrl"  />
                                                                {errors.ImageUrl && touched.ImageUrl ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.ImageUrl}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-4 rowInput">
                                                            <FormGroup className="form-group has-float-label position-relative">
                                                                <Label>
                                                                    <IntlMessages id="Scene" />
                                                                </Label>
                                                                <Field className="form-control" name="Scene" id="Scene" />
                                                                {errors.Scene && touched.Scene ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.Scene}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-4 rowInput">
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
                                                                    options={options}
                                                                />
                                                                {errors.Active && touched.Active ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {errors.Active}
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

export default FormGameMode;