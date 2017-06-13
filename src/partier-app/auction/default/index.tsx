import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import * as _ from 'lodash';


@observer
export default class AuctionList extends React.Component<RouteComponentProps<any>, {}> {

	private list = [
		{
			id: 1,
			date: new Date('2017-05-24'),
			city: 'Washington'
		},
		{
			id: 2,
			date: new Date('2017-05-25'),
			city: 'New York'
		},
		{
			id: 3,
			date: new Date('2017-05-26'),
			city: 'Washington'
		}
	];
	private curItem: any = null;

	renderPartiesCard() {
		return (
			<div className="parties-contents">
				{
					_.range(20).map((index: number) => (
						<div className="parties-card has-border" key={`auction_parties_card_${index}`}>Party Card {(index + 1)}</div>
					))
				}
			</div>
		);
	}

	renderSquadsCard() {
		return (
			<div className="squads-contents">
				{
					_.range(20).map((index: number) => (
						<div className="squads-card has-border" key={`auction_squads_card_${index}`}>Squad Card {(index + 1)}</div>
					))
				}
			</div>
		);
	}

	render() {
		return <div className="auction-contents">
			{
				this.list.map((item: any) => {
					return (
						<div className="auction-row" key={`auction_item_${item.date}`}>
							<div className="date-col">{moment(item.date).format('YYYY-MM-DD')}</div>
							<div className="city-col">{item.city}</div>
							<div className="button-col">
								<Link to={`/partier/auction/${item.id}`}><button className="btn btn-primary">View auction</button></Link>
							</div>
						</div>
					);
				})
			}
		</div>;
	}

}