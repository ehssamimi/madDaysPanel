import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Key = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './../../../component/RosourceManagement/Actio exp/subcomponents/UpdateAcionsWithKeys')
);
const Level = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './../../../component/RosourceManagement/Actio exp/subcomponents/UpdateActionsForEachLevel')
);

const ExpMain = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/update-key`} />
            <Route
                path={`${match.url}/update-key`}
                render={props => <Key {...props} />}
            />
            <Route
                path={`${match.url}/update-level`}
                render={props => <Level {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default ExpMain;