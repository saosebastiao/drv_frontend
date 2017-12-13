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
        <div className="box">
          <h4 className="subtitle is-4">{auction.regionID} {this.formatDate(auction.partyNight)}</h4>
          <div className="field">
            <label className="label">Entry Freeze</label>
            <p className="control">
              <span >
                {this.formatTime(auction.entryFreeze)}
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Starting Price</label>
            <p className="control">
              <span >
                {this.formatCurrency(auction.priceStart)}
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Price Drop Interval</label>
            <p className="control">
              <span >
                {this.formatInterval(auction.dropInterval)}
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Price Drop</label>
            <p className="control">
              <span >
                {this.formatCurrency(auction.priceDrop)}
              </span>
            </p>
          </div>
          {this.props.children}
        </div>
      );
    } else if (currentState.state === "EntryFreeze") {
      return (
        <div className="box">
          <h4 className="subtitle is-4">{auction.regionID} {this.formatDate(auction.partyNight)}</h4>
          <div className="field">
            <label className="label">Starting Price</label>
            <p className="control">
              <span >
                {this.formatCurrency(auction.priceStart)}
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Price Drop Interval</label>
            <p className="control">
              <span >
                {this.formatInterval(auction.dropInterval)}
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Price Drop</label>
            <p className="control">
              <span >
                {this.formatCurrency(auction.priceDrop)}
              </span>
            </p>
          </div>
        </div>
      );
    } else if (currentState.state === "ActiveAuction") {
      return (
        <div className="box">
          <h4 className="subtitle is-4">{auction.regionID} {this.formatDate(auction.partyNight)}</h4>
          <div className="field">
            <label className="label">Current Price</label>
            <p className="control">
              <span >
                {this.formatCurrency(currentState.price)}
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Price Drop Interval</label>
            <p className="control">
              <span >
                {this.formatInterval(auction.dropInterval)}
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Price Drop</label>
            <p className="control">
              <span >
                {this.formatCurrency(auction.priceDrop)}
              </span>
            </p>
          </div>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div className="box">
          <h4 className="subtitle is-4">{auction.regionID} {this.formatDate(auction.partyNight)}</h4>
          <span>Auction Ended</span>
          {this.props.children}
        </div>
      );
    }
  }
}
