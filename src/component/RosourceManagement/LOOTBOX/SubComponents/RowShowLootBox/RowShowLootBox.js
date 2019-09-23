import React, {Component,Fragment} from 'react';
// import img from '../../../../assets/detail.jpg'
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
import axios from "axios";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import RowShowShow from "../../../Shop/subComponents/ShowShopItem/RowShowShow";
import {TweenMax} from "gsap/TweenMax";
import * as Const from "../../../../Const";


class RowShowLootBox extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1",modal:false,Name:"",indexCHILD:props.index, x: 0, y: 0
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
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    DeleteItem = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        let Name=this.state.Name;
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        axios.get(`${Const.URL}lootbox/delete/${Name}` , {headers:headers}).then(responsive=>
        {

            const {Description}=responsive.data;
            console.log(Description);
            if (Description==='D') {
                NotificationManager.success(
                    "congratulation",
                    "loot box is delete",
                    3000,
                    null,
                    null,
                    "success"
                );
                let id=this.props.input._id;
                const $el = document.getElementById(`${id}`);
                const duration = 2;
                const from = { opacity: 0};
                TweenMax.to($el, duration, from);
                setTimeout(() => {
                    $el.remove();
                }, 2000)
                // setTimeout(function () {
                //     window.location.reload()
                // }, 3000);
            }else{
                NotificationManager.success(
                    "cant delete loot box",
                    Description,
                    3000,
                    null,
                    null,
                    "success"
                );
            }


            // let DES=JSON.parse(Description);
            // console.log(DES)
            // this.props.inprogress(DES);


        }).catch(error=>{console.log(error)});
    };
    _onMouseEnter(e) {
        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        TweenMax.to(button,0.5,{css:{ left:'15%',top:'15%',scale:2}});
      }
    _onMouseLeave(){
        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        TweenMax.to(button,0.5,{css:{ left:'5%',top:'5%',scale:1}});
    }
    render() {
        let {input,handelClick,img,index}=this.props;


        console.log(input);
        // console.log(input.IsActive);

        // Body form["Name"], form["ChanceType"], form["ItemType"], form["ImageUrl"] , form["Tag"],form["Key"]


        return (
                <Fragment  >

                    <Colxx xxs="12" lg="4" className="mb-4 rowDelay" id={input._id} >
                        <Card className="mb-4">
                            <div className="position-absolute card-top-buttons" onMouseEnter={this._onMouseEnter.bind(this)} onMouseLeave={this._onMouseLeave.bind(this)} >
                                <Button outline color={"white"} className="icon-button"  onClick={this.toggle}   id={`button ${index}`}>
                                    <i className="simple-icon-trash" />
                                </Button>
                            </div>
                            <div onClick={handelClick} >
                                <img
                                    src={img}
                                    alt="Detail"
                                    className="card-img-top imgheight cursor-pointer"
                                />

                                <CardBody  className="d-flex flex-column">
                                    <div className="col-12 d-flex">
                                        <div className="col-6">
                                            <RowShowShow label={"IsActive"} value={input.IsActive}/>
                                        </div>
                                        <div className="col-6">
                                            <RowShowShow label={"Name"} value={input.Name}/>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6">
                                            <RowShowShow label={"Price"} value={input.Price}/>
                                        </div>
                                        <div className="col-6">
                                            <RowShowShow label={"ItemList"} value={input.ItemList.length}/>

                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-12">
                                            {
                                                input.LootBoxType?<RowShowShow label={"LootBoxType"} value={input.LootBoxType}/>:''
                                            }
                                        </div>
                                    </div>
                                </CardBody>
                            </div>

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

export default RowShowLootBox;