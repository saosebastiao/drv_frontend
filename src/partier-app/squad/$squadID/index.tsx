import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import EditSquad from "./edit";
import EditFilters from "./filters";
import EditMembers from "./members";
import EditPayouts from "./payouts";
import EditSocial from "./social";
import SquadList from "./default";
import ViewAuction from "./auction";
import ViewParty from "./party";

export default class Squad extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <div className="squad-wrapper">
        <Switch>
          <Route exact path="/partier/squad" component={SquadList} />
          <Route path="/partier/squad/:squadID/edit" component={EditSquad} />
          <Route path="/partier/squad/:squadID/filters" component={EditFilters} />
          <Route path="/partier/squad/:squadID/members" component={EditMembers} />
          <Route path="/partier/squad/:squadID/payouts" component={EditPayouts} />
          <Route path="/partier/squad/:squadID/social" component={EditSocial} />
          <Route path="/partier/squad/:squadID/auction" component={ViewAuction} />
          <Route path="/partier/squad/:squadID/party" component={ViewParty} />
        </Switch>
      </div>
    );
  }

}
