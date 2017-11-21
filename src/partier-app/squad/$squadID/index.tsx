import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import EditSquad from "./edit";
import EditFilters from "./filters";
import EditMembers from "./members";
import EditPayouts from "./payouts";
import EditSocial from "./social";
import ViewSquad from "./default";
import ViewAuction from "./auction";
import ViewParty from "./party";
import ViewSquadModel from "./Model";

interface PSquadID {
  squadID: string;
}

export default class SquadID extends React.Component<RouteComponentProps<PSquadID>> {

  private model = new ViewSquadModel(parseInt(this.props.match.params.squadID, 10));
  public render() {
    return (
      <div className="squad-wrapper">
        <Switch>
          <Route path="/partier/squad/:squadID/edit" component={EditSquad} />
          <Route path="/partier/squad/:squadID/filters" component={EditFilters} />
          <Route path="/partier/squad/:squadID/members" component={EditMembers} />
          <Route path="/partier/squad/:squadID/payouts" component={EditPayouts} />
          <Route path="/partier/squad/:squadID/social" component={EditSocial} />
          <Route path="/partier/squad/:squadID/auction" component={ViewAuction} />
          <Route path="/partier/squad/:squadID/party" component={ViewParty} />
          <Route exact path="/partier/squad/:squadID" render={(p) => <ViewSquad model={this.model} {...p} />} />
        </Switch>
      </div>
    );
  }

}
