import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import SquadListModel from "./Model";

@observer
export default class VenueList extends React.Component<RouteComponentProps<any>, {}> {
	model = new SquadListModel;
	render() {
		return <div className="squad-wrapper">
			<div className="squad-contents">
				{
					this.model.list.map(venue => {
						return (
							<div key={venue.venueID}>
								<div>{venue.venueName}</div>
								<div className="button-col">
									<Link to={`/promoter/venues/${venue.venueID}`}><button className="btn btn-primary">View {venue.venueName}</button></Link>
									<Link to={`/promoter/venues/${venue.venueID}/edit`}><button className="btn btn-primary">Edit {venue.venueName}</button></Link>
								</div>
							</div>
						);
					})
				}
			</div>
			<div>
				<Link to={`/promoter/venues/create`}>
					<button className="btn btn-primary">Create a new Venue</button>
				</Link>
			</div>
		</div>;
	}
}