// tslint:disable:max-line-length
import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import EditSquad from "./edit";
import EditFilters from "./filters";
import EditMembers from "./members";
import EditPayouts from "./payouts";
import EditSocial from "./social";
import ViewSquad from "./default";
import ViewAuction from "./auction";
// import ViewParty from "./party";
import ViewSquadModel from "./Model";

const NotImplemented = () => <div>Not Implemented</div>;
interface PSquadID {
  squadID: string;
}

@observer
export default class SquadID extends React.Component<RouteComponentProps<PSquadID>> {
  private model = new ViewSquadModel(parseInt(this.props.match.params.squadID, 10));
  public render() {
    return this.model.isReady ? (
      <div className="squad-wrapper">
        <Switch>
          <Route exact path="/partier/squad/:squadID" render={(p) => <ViewSquad model={this.model} {...p} />} />
          <Route exact path="/partier/squad/:squadID/edit" render={(p) => <EditSquad model={this.model} {...p} />} />
          <Route exact path="/partier/squad/:squadID/members" render={(p) => <EditMembers model={this.model} {...p} />} />
          <Route exact path="/partier/squad/:squadID/filters" render={(p) => <EditFilters model={this.model} {...p} />} />
          <Route exact path="/partier/squad/:squadID/payouts" render={(p) => <EditPayouts model={this.model} {...p} />} />
          <Route exact path="/partier/squad/:squadID/social" render={(p) => <EditSocial model={this.model} {...p} />} />
          <Route exact path="/partier/squad/:squadID/auction" render={(p) => <ViewAuction model={this.model} {...p} />} />
          <Route exact path="/partier/squad/:squadID/party" render={() => <NotImplemented />} />
        </Switch>
      </div>
    ) : null;
  }
}
