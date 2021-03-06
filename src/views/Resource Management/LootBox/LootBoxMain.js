import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Add = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './../../../component/RosourceManagement/LOOTBOX/SubComponents/FromAddLootBox')
);
const Show = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './../../../component/RosourceManagement/LOOTBOX/SubComponents/ShowLootBox')
);

const LootBoxMain = ({ match }) => (
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
export default LootBoxMain;