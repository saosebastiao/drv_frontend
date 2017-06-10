import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./home";
import Partier from "./partier-app";
import Promoter from "./promoter-app";
import Admin from "./admin-app";

import DevTool from "mobx-react-devtools";


import "./styles.scss";


class AppRouter extends React.Component<{}, {}> {
  render() {
    return (
        <BrowserRouter>
					<Switch>
						<Route exact={true} path="/" component={Home} />
						<Route path="/partier" component={Partier} />
						<Route path="/promoter" component={Promoter} />
						<Route path="/admin" component={Admin} />
					</Switch>
        </BrowserRouter>
    );
  }
};
render(<AppRouter />, document.getElementById('root'));