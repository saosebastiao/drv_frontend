import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import * as _ from 'lodash';

import './styles.scss';

@observer
export default class Auction extends React.Component<RouteComponentProps<any>, {}> {

	private list: any = [];
	private id: number = 2;
	private curItem: any = null;

	constructor() {
		super();
		this.list = [
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
	}

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
  	let path = this.props.location.pathname;
  	let params = path.split('/');
  	for (var i = 0; i < params.length; i++) {
  		if (params[i] === 'auction') {
  			if (params[i + 1] === '')
  				this.id = null;
  			else
  				this.id = parseInt(params[i + 1]);
  			break;
  		}
  	}

  	return <div className="auction-wrapper">
    	{ this.id ? (
    			<div className="auction-details-contents">
    				<div className="auction-details-row">
    					<div className="details-col">
    						<div className="parties-wrapper has-border">
    							<div className="details-title">Parties</div>
    							{this.renderPartiesCard()}
    						</div>
    					</div>
    					<div className="details-col">
    						<div className="squads-wrapper has-border">
    							<div className="details-title">Squads</div>
    							{this.renderSquadsCard()}
    						</div>
    					</div>
    					<div className="details-col">
    						<div className="auction-info-wrapper">
    							<div className="details-title">Auction Info</div>
    						</div>
    						<div className="squad-info-wrapper">
    							<div className="details-title">Your Squad Info</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		) : (
    			<div className="auction-contents">
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
		    	</div>
    		)
    	}
    </div>;
  }
  
}