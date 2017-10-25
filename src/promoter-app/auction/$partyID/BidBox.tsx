import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as currencyFormatter from "currency-formatter";

interface PBidBox {
  party: IParty;
  squad: ISquadConfig;
  auctionState: IAuctionState;
  submitBid: (squadID: number) => void;
  submitSealedBid: (squadID: number, price: number) => void;
}

@observer
export default class BidBox extends React.Component<PBidBox>{
  @observable private sealedBid = 0;
  private setSealedBid = (e: any) => {
    this.sealedBid = e.target.value;
  }
  private submitBid = () => {
    this.props.submitBid(this.props.squad.squadID);
  }
  private submitSealedBid = () => {
    this.props.submitSealedBid(this.props.squad.squadID, this.sealedBid);
  }
  public render() {
    const auctionState = this.props.auctionState;
    const formatCurrency = (price: number) => {
      return currencyFormatter.format(price, {
        code: this.props.party.auction.currency,
        precision: 0
      });
    };
    return (
      <div>
        {
          auctionState.state === "ActiveAuction" ?
            <div>
              <button type="button" onClick={this.submitBid}>
                Bid {formatCurrency(auctionState.price)}
              </button>
            </div> : null
        }
        <div>
          <label>
            <input type="number"
              value={this.sealedBid}
              min={this.props.squad.filters.minimumPrice || 0}
              onChange={this.setSealedBid} />
            Pre-Bid On Squad
          </label>
          <button type="button" onClick={this.submitSealedBid}>
            Submit Sealed Bid
          </button>
        </div>
      </div >
    );
  }

}
