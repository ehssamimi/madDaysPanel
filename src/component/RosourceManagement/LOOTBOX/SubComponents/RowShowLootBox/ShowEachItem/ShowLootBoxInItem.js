// ShowLootBoxInItem
import React, {Component,Fragment} from 'react';
// import img from '../../../../../assets/detail.jpg'
// import img2 from '../../../../../assets/fat-rascal-thumb.jpg'
import ham  from '../../../../../assets/ham.jpg'
import {
    // Row,
    Card,
    CardBody,
    Button,
    // CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    // FormGroup,
    // Input,
    // Label
} from "reactstrap";
import { Colxx } from "../../../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../../../helpers/IntlMessages";
import axios from "axios";
import NotificationManager from "../../../../../../components/common/react-notifications/NotificationManager";
import RowShowShow from "../../../../Shop/subComponents/ShowShopItem/RowShowShow";
import * as Const from "../../../../../Const";


class ShowLootBoxInItem extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1",modal:false,Name:"",indexCHILD:props.index
        };

    }

    componentDidMount(){
        let {input}=this.props;



        // this.setState({
        //     Name: input.Name
        // });
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
        // alert(`${Name} is deleted`);
        let headers = {
            'Id': `${Const.ID}`,
            'Token': `${Const.Token}`
        };
        axios.get(`${Const.URL}admin/gameitem/delete/${Name}` , {headers:headers}).then(responsive=>
        {

            NotificationManager.success(
                "Success message",
                "Title here",
                3000,
                null,
                null,
                "success"
            );
            const {Description}=responsive.data;
            console.log(Description);
            // let DES=JSON.parse(Description);
            // console.log(DES)
            // this.props.inprogress(DES);


        }).catch(error=>{console.log(error)});
    };
    render() {
        let {input,handelClick}=this.props;

        console.log(input);



        return (
            <Fragment  >

                <Colxx  className="mb-4" onClick={handelClick}>
                    <Card className="mb-4">
                        <div className="position-absolute card-top-buttons" >
                            <Button outline color={"white"} className="icon-button"  onClick={this.toggle}>
                                <i className="simple-icon-pencil" />
                            </Button>
                        </div>
                        <img
                            src={ham}
                            alt="Detail"
                            className="card-img-top imgheight "
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

export default ShowLootBoxInItem;