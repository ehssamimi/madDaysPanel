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
import {
    FormikCustomRadioGroup,
    FormikDatePicker,
    FormikReactSelect,
    FormikTagsInput
} from "../../../../containers/form-validations/FormikFields";
import {TweenMax} from "gsap/TweenMax";
import loader from "../../../assets/6.gif";
import * as Const from "../../../Const";
const SignupSchema = Yup.object().shape({

    XP: Yup.string()
        .required("XP is required!"),
    Gold: Yup.number()
        .required("Gold is required!"),
    Rank: Yup.string()
        .required("Rank is required!"),
    DiamondDiamond: Yup.string()
        .required("DiamondDiamond is required!"),

});





const options = [
    { value: "Winner", label: "Winner" },
    { value: "Loser", label: "Loser" },
    { value: "Kill", label: "Kill" },
    { value: "CommonRewards", label: "CommonRewards" },
    { value: "HeadShots", label: "HeadShots" }
];

class UpdateAcionsWithKeys extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:false
        }
    }
    // componentDidMount(){
    //     TweenMax.staggerFrom( '.rowInput', 1, {autoAlpha:0, y: 100} ,0.1);﻿﻿﻿
    //
    // }



    handleSubmit = (values, { setSubmitting }) => {
        this.setState({
            loaderActive:true
        });
        const payload = {
            ...values,
            KeyValue: values.KeyValue.value
            // Names: values.Names.value,
        };
        console.log(payload);


        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };

        let key=payload.KeyValue;
        let Data= {"XP": payload.XP, "Gold":payload.Gold, "Rank": payload.Rank, "Diamond": payload.DiamondDiamond};
        let form = new FormData();
           form.append('Data', JSON.stringify(Data) );
        axios.post(`${Const.URL}admin/action/${key}/update` ,form, {headers:headers}).then(responsive=>
        {
            this.setState({
                loaderActive:false
            });
            const {Description}=responsive.data;
            NotificationManager.success(
                "Success message",
                "Title here",
                3000,
                null,
                null,
                "success"
            );
            // let DES=JSON.parse(Description);
            // this.props.inprogress(DES);x
            console.log(Description)
        }).catch(error=>{console.log(error)});
    };





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
                                        <IntlMessages id="Update Action with key" />
                                    </CardTitle>

                                    <Formik
                                        initialValues={{
                                            XP: "0",
                                            Gold: '0',
                                            Rank: "0",
                                            DiamondDiamond: "0",
                                            KeyValue:{ value: "Winner", label: "Winner"}
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
                                                <div className="col-sm-6 offset-3 ">
                                                    <FormGroup className="form-group has-float-label col-12">
                                                        <Label className="ml-3">
                                                            <IntlMessages id="KeyValue" />
                                                        </Label>
                                                        <FormikReactSelect
                                                            name="KeyValue"
                                                            id="KeyValue"
                                                            value={values.KeyValue}
                                                            options={options}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.KeyValue && touched.KeyValue ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.KeyValue}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>

                                                <div className="w-100 d-flex ">
                                                    <div className="col-sm-6 rowInput">
                                                        <FormGroup className="form-group has-float-label position-relative">
                                                            <Label>
                                                                <IntlMessages id="XP" />
                                                            </Label>
                                                            <Field className="form-control" name="XP"  />
                                                            {errors.XP && touched.XP ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.XP}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-6 rowInput">
                                                        <FormGroup className="form-group has-float-label position-relative">
                                                            <Label>
                                                                <IntlMessages id="Gold" />
                                                            </Label>
                                                            <Field className="form-control" name="Gold" />
                                                            {errors.Gold && touched.Gold ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.Gold}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
                                                </div>

                                                <div className="w-100 d-flex ">
                                                    <div className="col-sm-6 rowInput">
                                                        <FormGroup className="form-group has-float-label position-relative">
                                                            <Label>
                                                                <IntlMessages id="DiamondDiamond" />
                                                            </Label>
                                                            <Field className="form-control" name="DiamondDiamond"  />
                                                            {errors.DiamondDiamond && touched.DiamondDiamond ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.DiamondDiamond}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-6 rowInput">
                                                        <FormGroup className="form-group has-float-label position-relative">
                                                            <Label>
                                                                <IntlMessages id="Rank" />
                                                            </Label>
                                                            <Field className="form-control" name="Rank" />
                                                            {errors.Rank && touched.Rank ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.Rank}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
                                                </div>

                                                <Button color="primary" type="submit" className="col-2 rowInput ">
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

export default UpdateAcionsWithKeys;