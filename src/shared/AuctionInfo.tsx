import * as React from "react";
import { observer } from "mobx-react";
import * as currencyFormatter from "currency-formatter";
import * as moment from "moment";

interface PAuctionInfo {
  auction: IAuction;
  currentState: IAuctionState;
}

@observer
export default class AuctionInfo extends React.Component<PAuctionInfo>{
  private formatCurrency = (val: number) => {
    return currencyFormatter.format(val, {
      code: this.props.auction.currency,
      precision: 0
    });
  }
  private formatTime = (val: string) => {
    return moment(val).format("LT");
  }
  private formatDate = (val: string) => {
    return moment(val).format("ll");
  }
  private formatInterval = (val: string) => {
    return moment.duration(val).humanize();
  }
  public render() {
    const { auction, currentState } = this.props;
    if (currentState.state === "PreAuction") {
      return (
        <div className="auction-info-wrapper">
          <div className="details-title">Auction Info</div>
          <div>{auction.regionID}</div>
          <div>{this.formatDate(auction.partyNight)}</div>
          <div>Auction Entries freeze at {this.formatTime(auction.entryFreeze)}</div>
          <div>Auction starts at {this.formatTime(auction.startTime)}</div>
          <div>Auction ends at {this.formatTime(auction.endTime)}</div>
          <div>Prices start at {this.formatCurrency(auction.priceStart)}</div>
          <div>
            Prices drop by {this.formatCurrency(auction.priceDrop)} every {this.formatInterval(auction.dropInterval)}
          </div>
          {this.props.children}
        </div>
      );
    } else if (currentState.state === "EntryFreeze") {
      return (
        <div className="auction-info-wrapper">
          <div className="details-title">Auction Info</div>
          <div>{currentState.state}</div>
          <div>{auction.regionID}</div>
          <div>{this.formatDate(auction.partyNight)}</div>
          <div>Auction Entries are frozen</div>
          <div>Auction starts at {this.formatTime(auction.startTime)}</div>
          <div>Auction ends at {this.formatTime(auction.endTime)}</div>
          <div>Prices start at {this.formatCurrency(auction.priceStart)}</div>
          <div>
            Prices drop by {this.formatCurrency(auction.priceDrop)} every {this.formatInterval(auction.dropInterval)}
          </div>
          {this.props.children}
        </div>
      );
    } else if (currentState.state === "ActiveAuction") {
      return (
        <div className="auction-info-wrapper">
          <div className="details-title">Auction Info</div>
          <div>{currentState.state}</div>
          <div>{auction.regionID}</div>
          <div>{this.formatDate(auction.partyNight)}</div>
          <div>Auction Entries are frozen and Auction has started</div>
          <div>Current Price {this.formatCurrency(currentState.price)}</div>
          <div>
            Price will drop to {this.formatCurrency(currentState.price - auction.priceDrop)}
          </div>
          <div>
            Prices drop by {this.formatCurrency(auction.priceDrop)} every {this.formatInterval(auction.dropInterval)}
          </div>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div className="auction-info-wrapper">
          <div className="details-title">Auction Info</div>
          <div>{currentState.state}</div>
          <div>{auction.regionID}</div>
          <div>{this.formatDate(auction.partyNight)}</div>
          <div>Auction has Ended</div>
          {this.props.children}
        </div>
      );
    }
  }
}
