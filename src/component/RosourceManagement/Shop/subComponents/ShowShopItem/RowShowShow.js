import React, {Component} from 'react';
import IntlMessages from "../../../../../helpers/IntlMessages";

class RowShowShow extends Component {
    render() {
        let{label,value}=this.props;

        return (
            <div className="w-100  ">
                <p className=" text-small mb-2 warning-color-text">
                    <IntlMessages id={`${label} :`}/>
                </p>
                <p className="mb-3 font-weight-bold">
                    {value}
                </p>
            </div>
        );
    }
}

export default RowShowShow;