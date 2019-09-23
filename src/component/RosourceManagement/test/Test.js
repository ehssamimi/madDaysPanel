import React, {Component} from 'react';
import AutoSuggestEdit from "./AutoSuggestEdit";
import axios from "axios";
import cakes from "../../../data/cakes";


class Test extends Component {
    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            Device:[],
            DATA:[],value:"n",dict:{},DefaultData:[]
        }
    }
    handelChange(e, value){
        // console.log(value);
        this.setState({
            value
        })

        let headers = {
            'Id': "5d1870f09d79a3cc6e224e59",
            'Token': "a698d224f32b856f7b066792ca544b875a28478081af5e049f834bfa3d995179"
        };
        if (value.length>0) {
            axios.get(`https://resource.themaddays.com/admin/gameitem/search/${value}`,{headers:headers}).then(responsive=>
            {
                const {Description} = responsive.data;
                console.log(`https://resource.themaddays.com/admin/gameitem/search/${value}`);

                let index;let Device=[];
                let Data=JSON.parse(Description);

                for (index in Data){
                    Device.push({title:Data[index].Name ,id:Data[index]._id})
                }
                // console.log(Device);

                let dict = {};
                for (index in Data){
                    let id =Data[index].Name;
                    let Value =Data[index]._id;
                    // dict[id] = Value;
                    dict[Value] = id;
                }

                let DATA=[];
                Device.map(item => {
                    DATA.push({name: item.title})
                });
                this.setState({
                    Device,
                    DATA
                })

                // console.log(this.state.DATA);

            }).catch(error=>{console.log(error)});
        }

    }

    componentDidMount(props){
        let {value}=this.state;

        let headers = {
            'Id': "5d1870f09d79a3cc6e224e59",
            'Token': "a698d224f32b856f7b066792ca544b875a28478081af5e049f834bfa3d995179"
        };
        axios.get(`https://resource.themaddays.com/admin/gameitem/search/${value}`,{headers:headers}).then(responsive=>
        {
            const {Description} = responsive.data;
            // console.log(`https://resource.themaddays.com/admin/gameitem/search/${value}`);

            let index;let Device=[];
            let Data=JSON.parse(Description);
            for (index in Data){
                Device.push({title:Data[index].Name ,id:Data[index]._id})

            }
            // console.log(Device);

            let dict = {};
            for (index in Data){
                let id =Data[index].Name;
                let Value =Data[index]._id;
                // dict[id] = Value;
                dict[Value] = id;
            }


            // var giveValue = function (myKey) {
            //     return dict[myKey];
            // };


            let DATA=[];
            Device.map(item => {
                DATA.push({name: item.title})
            });
            this.setState({
                Device,
                DATA,dict,
                DefaultData:DATA
            });

            // console.log(this.state.DefaultData);

        }).catch(error=>{console.log(error)});


    }
    render() {
        let{DATA,DefaultData,Device}=this.state;
        // console.log(DATA);
        // console.log(DefaultData);
        // console.log( DATA.length);
        // console.log(Device);
        // console.log(cakes);
        // const data = cakes.map(item => {
        //     return {name: item.title}
        // });
        const data = Device.map(item => {
            return {name: item.title}
        });


        console.log(data);

        return (
            <div>
                {
                    DATA.length>0?
                    <AutoSuggestEdit
                        placeholder={"type item name"}
                        data={DATA}

                        // onChange={value => {
                        //     // console.log(value)
                        //     this.setState({
                        //         value
                        //     })
                        // }}
                        // onChange={value => {}}
                        onChange={value => this.handelChange(this, value)}
                        // onChange={value => {}}

                    />: DefaultData.length>0?     <AutoSuggestEdit
                            placeholder={"type item name"}
                            data={DefaultData}

                            // onChange={value => {
                            //     // console.log(value)
                            //     this.setState({
                            //         value
                            //     })
                            // }}
                            // onChange={value => {}}
                            // onChange={value => this.handelChange(this, value)}
                            onChange={value => {}}

                        />:""

                    // DATA.length > 0 ? <AutoSuggestEdit
                    //         placeholder={"type item name"}
                    //         data={DATA}
                    //
                    //         // onChange={value => {
                    //         //     // console.log(value)
                    //         //     this.setState({
                    //         //         value
                    //         //     })
                    //         // }}
                    //         // onChange={value => {}}
                    //         onChange={value => this.handelChange(this, value)}
                    //
                    //     />
                    //     : ""



                        // <AutoSuggestEdit
                        //     placeholder={"type item name"}
                        //     data={DefaultData}
                        //
                        //     // onChange={value => {
                        //     //     // console.log(value)
                        //     //     this.setState({
                        //     //         value
                        //     //     })
                        //     // }}
                        //     // onChange={value => {}}
                        //     onChange={value => this.handelChange(this, value)}
                        //
                        // />

                }
            </div>
        );
    }
}

export default Test;