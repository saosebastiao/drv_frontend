import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import DevTool from "mobx-react-devtools";

import App from "./views/app";
import store from './redux/store';

import "./styles.scss";


class AppRouter extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
					<Switch>
						<Route path="/" component={App} />
					</Switch>
        </BrowserRouter>
      </Provider>
    );
  }
};
render(<AppRouter />, document.getElementById('root'));