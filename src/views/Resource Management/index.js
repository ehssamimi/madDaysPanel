import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const GameMode = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './Game Mode')
);
const GameCurrency = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './Game Currency/GameCurrencyMain')
);
const GameItem = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './Game Items/GameItemsMain')
);
const Exp = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './Exp/ExpMain')
);
const LootBox = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './LootBox/LootBoxMain')
);
const ShopMain = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './Shop/ShopMain')
);

class Index extends Component {
    render() {
        const { match } = this.props;

        return (
            <AppLayout>
                <div className="dashboard-wrapper">
                    <Suspense fallback={<div className="loading" />}>
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={`${match.url}/game-mode`} />
                            <Route
                                path={`${match.url}/game-mode`}
                                render={props => <GameMode {...props} />}
                            />
                            <Route
                                path={`${match.url}/game-currency`}
                                render={props => <GameCurrency {...props} />}
                            />
                            <Route
                                path={`${match.url}/game-item`}
                                render={props => <GameItem {...props} />}
                            />
                            <Route
                                path={`${match.url}/exp`}
                                render={props => <Exp {...props} />}
                            />
                            <Route
                                path={`${match.url}/loot-box`}
                                render={props => <LootBox {...props} />}
                            />
                            <Route
                                path={`${match.url}/shop`}
                                render={props => <ShopMain {...props} />}
                            />

                            <Redirect to="/error" />
                        </Switch>
                    </Suspense>
                </div>
            </AppLayout>
        );
    }
}
const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};

export default withRouter(
    connect(
        mapStateToProps,
        {}
    )(Index)
);
