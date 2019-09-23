import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Form = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './../../../component/RosourceManagement/GameItem/subcomponentsTwoTabs/FormGameItem')
);
const Show = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './../../../component/RosourceManagement/GameItem/subcomponentsTwoTabs/ShowGameItem')
);

const GameItemsMain = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/add`} />
            <Route
                path={`${match.url}/add`}
                render={props => <Form {...props} />}
            />
            <Route
                path={`${match.url}/show`}
                render={props => <Show {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default GameItemsMain;

