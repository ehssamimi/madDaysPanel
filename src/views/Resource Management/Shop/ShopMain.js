import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Add = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './../../../component/RosourceManagement/Shop/subComponents/FormAddShopItem')
);
const Show = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './../../../component/RosourceManagement/Shop/subComponents/FormAddShopItem')
);

const ShopMain = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/add`} />
            <Route
                path={`${match.url}/add`}
                render={props => <Add {...props} />}
            />
            <Route
                path={`${match.url}/show`}
                render={props => <Show {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default ShopMain;