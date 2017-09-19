import * as React from "react";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import PartyID from "./$partyID";
import AuctionList from "./default";
import "./styles.scss";

export default class Auction extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <div className="auction-wrapper">
        <Switch>
          <Route exact path="/promoter/auction" component={AuctionList} />
          <Route path="/promoter/auction/:partyID" component={PartyID} />
        </Switch>
      </div>
    );
  }

}
