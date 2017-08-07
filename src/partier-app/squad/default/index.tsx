import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import SquadListModel from "./Model";

@observer
export default class SquadList extends React.Component<RouteComponentProps<any>, {}> {
	model = new SquadListModel;
	render() {

		return <div className="squad-wrapper">
			<div className="squad-contents">
				{
					this.model.list.map((partyNight: any) => {
						return (
							<div className="squad-row" key={`squad_item_${partyNight.partyNight}`}>
								<div className="date-col">{moment(partyNight.partyNight).format('YYYY-MM-DD')}</div>
								<div className="button-col">
									{partyNight.squad ? (
										<Link to={`/partier/squad/${partyNight.squad}`}><button className="btn btn-primary">View your squad</button></Link>) :
										<button className="btn btn-primary" data-toggle="modal" data-target="#createSquadModal">Create a squad</button>}
									{partyNight.invites > 0 ? (
										<button className="btn btn-primary" data-toggle="modal" data-target="#viewInviteModal">View invites</button>
									) : null}
								</div>
							</div>
						);
					})
				}
			</div>
			<div className="modal fade" id="createSquadModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title" id="exampleModalLabel">Create a squad</h4>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
							Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
							Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
			      </div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="viewInviteModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title" id="exampleModalLabel">View invites</h4>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
							Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
							Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
			      </div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
}