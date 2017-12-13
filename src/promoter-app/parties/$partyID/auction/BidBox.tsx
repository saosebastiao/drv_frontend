import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as currencyFormatter from "currency-formatter";

interface PBidBox {
  party: IParty;
  squad: ISquadConfig;
  auctionState: IAuctionState;
  bid?: IPartyBidResponse;
  revokeBid: (squadID: number) => void;
  submitBid: (squadID: number) => void;
  submitSealedBid: (squadID: number, price: number) => void;
}

@observer
export default class BidBox extends React.Component<PBidBox>{
  @observable private sealedBid = 0;
  private setSealedBid = (e: any) => {
    this.sealedBid = parseInt(e.target.value, 10);
  }
  private revokeBid = () => {
    this.props.revokeBid(this.props.squad.squadID);
  }
  private submitBid = () => {
    this.props.submitBid(this.props.squad.squadID);
  }
  private submitSealedBid = () => {
    this.props.submitSealedBid(this.props.squad.squadID, this.sealedBid);
  }
  private auctionState = this.props.auctionState;
  private formatCurrency = (price: number) => {
    return currencyFormatter.format(price, {
      code: this.props.party.auction.currency,
      precision: 0
    });
  }
  public render() {
    const bid = this.props.bid;
    if (bid && bid.msg === "SquadBidSuccessful") {
      return (
        <div>
          Squad Bid Successful!: {this.formatCurrency(bid.price)}
        </div>
      );
    } else if (bid && bid.msg === "SquadBidFailed") {
      return (
        <div>
          Squad Bid Failed!: {this.formatCurrency(bid.price)}
        </div>
      );
    } else if (bid && bid.msg === "SquadTaken") {
      return (
        <div>
          Squad Taken!: {this.formatCurrency(bid.price)}
        </div>
      );
    } else if (bid && bid.msg === "SquadBidReceived") {
      return (
        <div>
          Current Bid: {this.formatCurrency(bid.price)}
          <div>
            <button type="button" onClick={this.revokeBid}>
              Revoke Bid
            </button>
            <div>
              <input type="number"
                value={this.sealedBid}
                min={this.props.squad.filters.minimumPrice || 0}
                step={5}
                onChange={this.setSealedBid} />
              <button type="button" onClick={this.submitSealedBid}>
                Submit Sealed Bid
              </button>
            </div>
          </div >
        </div>
      );
    } else {
      return (
        <div>
          {
            this.auctionState.state === "ActiveAuction" ?
              <div className="field">
                <div className="control">
                  <button type="button" className="button is-primary" onClick={this.submitBid}>
                    Submit Bid for {this.formatCurrency(this.auctionState.price)}
                  </button>
                </div>
              </div> : null
          }
          <div className="field has-addons">
            <div className="control">
              <input type="number"
                className="input"
                value={this.sealedBid}
                min={this.props.squad.filters.minimumPrice || 0}
                step={5}
                onChange={this.setSealedBid} />
            </div>
            <div className="control">
              <button type="button" className="button is-primary" onClick={this.submitSealedBid}>
                Submit Sealed Bid
              </button>
            </div>
          </div>
        </div >
      );
    }
  }
}
