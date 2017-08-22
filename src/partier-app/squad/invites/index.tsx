import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import InvitesListModel from "./Model";
import SquadCard from "./SquadCard";

@observer
export default class InvitesList extends React.Component<RouteComponentProps<any>, {}> {
	model = new InvitesListModel(this.props.match.params.partyNight);
	render() {
		return this.model.isReady ? <div className="squad-wrapper">
			<div className="squad-contents">
				{this.model.squads.map(s => <SquadCard key={s} squadID={s} />)}
			</div>
		</div> : null;
	}
}