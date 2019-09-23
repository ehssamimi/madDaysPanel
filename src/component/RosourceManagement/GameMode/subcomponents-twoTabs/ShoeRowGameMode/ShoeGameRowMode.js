import React, {Component, Fragment} from 'react';
// import img from '../../../../assets/detail.jpg'
// import breakfast from '../../../../assets/breakfast.jpg'
// import breakfast2 from '../../../../assets/breakfast2.jpg'
import {
    Row,
    Card,
    CardBody,
    Button,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import { Colxx } from "../../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import RowShowShow from "../../../Shop/subComponents/ShowShopItem/RowShowShow";
import axios from "axios";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
var classNames = require('classnames');



class ShoeGameRowMode extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1",modal:false,Name:"",imgHover:false,liClasses:classNames({
                // 'border-0': true,
                'card-img-top': true,
            })
        };
    }
    componentDidMount(){
        let {input}=this.props;
        this.setState({
            Name: input._id
        });
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
        }
    }
    toggle = () => {
        console.log("toggel");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    DeleteItem = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        let Name=this.state.Name;
        // alert(`${Name} is deleted`);
        let headers = {
            'Id': "5d1870f09d79a3cc6e224e59",
            'Token': "a698d224f32b856f7b066792ca544b875a28478081af5e049f834bfa3d995179"
        };
        console.log(Name);
        // /modes/delete/<id>
        axios.get(`https://resource.themaddays.com/modes/delete/${Name}` , {headers:headers}).then(responsive=>
        {

            const {Description}=responsive.data;
            console.log(Description);
            if (Description==='D'){
                NotificationManager.success(
                    "congratulation",
                    "that game mode is delete",
                    3000,
                    null,
                    null,
                    "success"
                );
                setTimeout(function(){ window.location.reload(); }, 3000);
            }else{
                NotificationManager.success(
                    "cant delete Game mode",
                    Description,
                    3000,
                    null,
                    null,
                    "success"
                );
            }
        }).catch(error=>{console.log(error)});
    };
    handelHover(){
        let liClasses = classNames({
            'card-img-top': true,
            'hoverImg': !this.state.imgHover
        });

        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,liClasses
        }));

        // console.log(this.state.hoverImg);
        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        TweenMax.to(button,0.5,{css:{ left:'40%',top:'30%',scale:3}});
    }
    handelHoveOut(){
        let liClasses = classNames({
            'card-img-top': true,
            'hoverImg': this.state.imgHover
            // 'hoverImg': true
        });

        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,
            liClasses
        }));
        // console.log(this.state.hoverImg);
        TweenMax.to(button,0.5,{css:{left:'0%',top:'0%',scale:1}});
    }
    render() {
        let {input, img, index}=this.props;
        let {liClasses}=this.state;
        // console.log(input);
        // console.log(input.IsActive);


        return (
            <Fragment>

                <Colxx xxs="12" lg="4" className="mb-4 rowDelay">
                    <Card className="mb-4">
                        <div onMouseEnter={this.handelHover.bind(this)} onMouseLeave={this.handelHoveOut.bind(this)}>
                            {/*<div className="position-absolute card-top-buttons" onClick={this.toggle}>*/}
                            {/*<Button outline color={"white"} className="icon-button"   id={`button ${index}`}>*/}
                            {/*<i className="simple-icon-trash" />*/}
                            {/*</Button>*/}
                            {/*</div>*/}
                            {/*<img*/}
                            {/*src={img}*/}
                            {/*alt="Detail"*/}
                            {/*className={liClasses}*/}
                            {/*/>*/}

                            <img
                                src={img}
                                alt={index}
                                className={liClasses}
                            />
                            <div>
                                <Button outline color={"white"} className="trashIconBox " onClick={this.toggle}
                                        id={`button ${index}`}>
                                    <i className="simple-icon-trash"/>
                                </Button>
                            </div>
                        </div>


                        <CardBody  className="d-flex flex-column">
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label={"MatchType"} value={input.MatchType} />
                                </div>

                                <div className="col-6">
                                    <RowShowShow label={"MatchName"} value={input.MatchName} />
                                </div>
                            </div>
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label={"MatchTime"} value={input.MatchTime} />
                                </div>
                                <div className="col-6">
                                    <p className="text-small mb-2 warning-color-text">
                                        <IntlMessages id="Active"/>
                                    </p>
                                    <p className="mb-3 font-weight-bold">
                                        {input.IsActive===true?<span>True</span>:<span>False</span>}
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label={"Kill"} value={input.Kill} />
                                </div>
                                <div className="col-6">
                                    <RowShowShow label={"Price"} value={input.Price} />
                                </div>
                            </div>

                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <RowShowShow label={"Scene"} value={input.Scene} />
                                </div>
                                <div className="col-6">
                                    <RowShowShow label={"EXP"} value={input.EXP} />
                                </div>

                            </div>
                            <div className="col-12 ">
                                <div className="col-12">
                                    <RowShowShow label={"MaxPlayers"} value={input.MaxPlayers} />
                                </div>
                            </div>

                        </CardBody>
                    </Card>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            <IntlMessages id="Delete Item" />
                        </ModalHeader>
                        <ModalBody>
                            Are You Really fucking sure ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.DeleteItem}>
                                Delete Item
                            </Button>{" "}
                            <Button color="secondary" onClick={this.toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                </Colxx>


            </Fragment>
        );
    }
}

export default ShoeGameRowMode;