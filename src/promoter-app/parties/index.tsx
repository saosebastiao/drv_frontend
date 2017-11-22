import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import PartyID from "./$partyID";
import CreateParty from "./create";
import ImportParty from "./import";
import PartyList from "./default";

export default class Party extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <div className="squad-wrapper">
        <Switch>
          <Route exact path="/promoter/parties" component={PartyList} />
          <Route path="/promoter/parties/import/" component={ImportParty} />
          <Route path="/promoter/parties/create/:partyNight" component={CreateParty} />
          <Route path="/promoter/parties/:partyID" component={PartyID} />
        </Switch>
      </div>
    );
  }

}
