import * as React from "react";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import AuctionID from "./$squadID";
import AuctionList from "./default";

export default class Auction extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <div className="auction-wrapper">
        <Switch>
          <Route exact path="/partier/auction" component={AuctionList} />
          <Route path="/partier/auction/:squadID" component={AuctionID} />
        </Switch>
      </div>
    );
  }

}
