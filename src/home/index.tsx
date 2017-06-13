import * as React from "react";
import { Link, RouteComponentProps } from 'react-router-dom';
import { observer } from "mobx-react";

import './styles.scss';

@observer
export default class Home extends React.Component<RouteComponentProps<{}>, {}> {

  render() {
    return <div className="home-wrapper">
    	<div className="home-contents">
    		<div className="logo"></div>
    		<br />
    		<div className="welcome-text">
    			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    			Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    		</div>
    		<br />
    		<a className="btn btn-primary btn-lg" href={'/partier'}>Login as a partier</a>
    		<br />
    		<a className="btn btn-primary btn-lg" href={'/promoter'}>Login as a party promoter</a>
    	</div>
    </div>;
  }

}