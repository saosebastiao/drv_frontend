import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as _ from 'lodash';
import ViewInvitesModel from "./Model";



@observer
export default class ViewInvites extends React.Component<RouteComponentProps<any>, {}> {
	model: ViewInvitesModel;
	constructor(props: RouteComponentProps<any>) {
		super(props);
		const partyNight = this.props.match.params.partyNight;
		this.model = new ViewInvitesModel(partyNight);
	}
	submit = async () => {
	}

	render() {
		return <div>
			<div >
				<div>
				</div>
			</div>
		</div>;
	}
}
