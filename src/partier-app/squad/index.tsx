import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import SquadID from "./$squadID";
import EditSquad from "./$squadID/edit";
import EditFilters from "./$squadID/filters";
import EditMembers from "./$squadID/members";
import EditPayouts from "./$squadID/payouts";
import EditSocial from "./$squadID/social";
import CreateSquad from "./create";
import SquadList from "./default";
import ViewInvites from "./invites";
import ViewAuction from "./$squadID/auction";
import ViewParty from "./$squadID/party";

export default class Squad extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <div className="squad-wrapper">
        <Switch>
          <Route exact path="/partier/squad" component={SquadList} />
          <Route path="/partier/squad/create/:partyNight" component={CreateSquad} />
          <Route path="/partier/squad/invites/:partyNight" component={ViewInvites} />
          <Route path="/partier/squad/:squadID/edit" component={EditSquad} />
          <Route path="/partier/squad/:squadID/filters" component={EditFilters} />
          <Route path="/partier/squad/:squadID/members" component={EditMembers} />
          <Route path="/partier/squad/:squadID/payouts" component={EditPayouts} />
          <Route path="/partier/squad/:squadID/social" component={EditSocial} />
          <Route path="/partier/squad/:squadID/auction" component={ViewAuction} />
          <Route path="/partier/squad/:squadID/party" component={ViewParty} />
          <Route path="/partier/squad/:squadID" component={SquadID} />
        </Switch>
      </div>
    );
  }

}
