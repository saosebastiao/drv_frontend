import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import Home from "../home";
import Partier from "../partier";
import Header from "../header";
import Footer from "../footer";
import Profile from '../profile';
import ProfileEdit from '../profile-edit';
import Squad from '../squad';
import Auction from '../auction';

import './styles.scss';

export default class App extends React.Component<RouteComponentProps<any>, {}> {

  render() {
  	let path:string = this.props.location.pathname;
  	let hasHeader:boolean = true;
  	if (path === "/")
  		hasHeader = false;

    return (
    	<div className="main-wrapper">
				{ hasHeader ? <Header {...this.props.location} /> : null }
				<div className={ hasHeader ? "body-wrapper has-header" : "body-wrapper" }>
					<Route exact={true} path='/' component={Home} />
					<Route path='/partier' component={Partier} />
          <Route path='/partier/profile' component={Profile as any} />
          <Route path='/partier/profile-edit' component={ProfileEdit as any} />
          <Route path='/partier/squad' component={Squad} />
          <Route path='/partier/auction' component={Auction} />
				</div>
				{ hasHeader ? <Footer /> : null }
			</div>
    )
  }

}
