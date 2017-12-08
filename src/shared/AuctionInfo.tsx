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
          <h4 className="subtitle is-4">{auction.regionID}</h4>
          <h5 className="subtitle is-5">{this.formatDate(auction.partyNight)}</h5>
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
        <div className="box">
          <h4 className="subtitle is-4">{auction.regionID}</h4>
          <h5 className="subtitle is-5">{this.formatDate(auction.partyNight)}</h5>
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
        <div className="box">
          <h4 className="subtitle is-4">{auction.regionID} {this.formatDate(auction.partyNight)}</h4>
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Current Price</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <span >
                    {this.formatCurrency(currentState.price)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Price Drop Interval</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <span >
                    {this.formatInterval(auction.dropInterval)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Price Drop</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <span >
                    {this.formatCurrency(auction.priceDrop)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div className="box">
          <h4 className="subtitle is-4">{auction.regionID}</h4>
          <h5 className="subtitle is-5">{this.formatDate(auction.partyNight)}</h5>
          <div>Auction has Ended</div>
          {this.props.children}
        </div>
      );
    }
  }
}
