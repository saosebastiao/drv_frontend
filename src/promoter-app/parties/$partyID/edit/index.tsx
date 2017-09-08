import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import PartyEditModel from "./Model";

interface PPartyEdit {
	partyID: number;
}

@observer
export default class PartyEdit extends React.Component<RouteComponentProps<PPartyEdit>, {}> {
	model = new PartyEditModel(this.props.match.params.partyID);
	render() {
		return this.model.isReady ? <div className="squad-wrapper">
			{this.model.partyName}
		</div> : null;
	}
}