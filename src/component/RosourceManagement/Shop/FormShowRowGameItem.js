import React, {Component} from 'react';
import {TweenMax} from "gsap/TweenMax";
import img from "../../assets/pizza.jpg";
var classNames = require('classnames');

class FormShowRowGameItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgHover:false,liClasses:classNames({
                'border-0': true,
                'img-Game-Item': true,
                'hoverImg': false
            })
        };

    }

    handelHover(){
        let liClasses = classNames({
            'border-0': true,
            'img-Game-Item': true,
            'hoverImg': !this.state.imgHover
            // 'hoverImg': true
        });

        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,liClasses
        }));

        console.log(this.state.hoverImg);
        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        TweenMax.to(button,0.5,{css:{ left:'20%',top:'40%',scale:2}});

    }
    handelHoveOut(){
        let liClasses = classNames({
            'border-0': true,
            'img-Game-Item': true,
            'hoverImg': this.state.imgHover
            // 'hoverImg': true
        });

        let {index}=this.props;
        let button=document.getElementById(`button ${index}`);
        this.setState(prevState => ({
            hoverImg:!prevState.hoverImg,liClasses
        }));
           TweenMax.to(button,0.5,{css:{left:'20%',top:'0%',scale:1}});
    }

    render() {
        let {order,index,handelClick}=this.props;
        let {imgHover,liClasses}=this.state;
        console.log('order');
        console.log(order);


        return (
            <div className="col-md-6 col-sm-12 "  >
                <div className="d-flex  mb-3 position-relative  w-100">
                    <div onMouseEnter={this.handelHover.bind(this)} onMouseLeave={this.handelHoveOut.bind(this)} onClick={handelClick}>
                        <img
                            src={img}
                            alt={order.Name}
                            // className=" border-0 img-Game-Item hoverImg"
                            // className={["border-0","img-Game-Item",imgHover?"hoverImg":""].join(" ")}
                            className={liClasses}
                        />
                        <div  >
                            <div  color={"white"} className="trashIcon " id={`button ${index}`}>
                                <i className="simple-icon-trash"/>
                            </div>
                        </div>
                    </div>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                        <p className="list-item-heading"><span>ChanceType : </span>{order.ChanceType}</p>
                        <p className="list-item-heading"><span>ItemType : </span>{order.ItemType}</p>
                        <p className="list-item-heading"><span>ImageUrl : </span>{order.ImageUrl}</p>
                        {/*<p className="list-item-heading"><span>Name : </span >{order._id}</p>*/}
                        <p className="list-item-heading"><span>Name : </span >{order.Name}</p>
                        <p className="list-item-heading"><span>Tag : </span>{order.Tag}</p>
                        <p className="list-item-heading"><span>Key : </span>{order.Key}</p>
                        {/*<div className="text-primary text-small font-weight-medium d-none d-sm-block">*/}
                            {/*<span>Update_at:</span> {order.Update_at.slice(0, 10)}*/}
                        {/*</div>*/}
                    </div>
                     </div>
              </div>



        );
    }
}

export default FormShowRowGameItem;