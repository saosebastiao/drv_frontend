// tslint:disable:max-line-length
import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch, NavLink } from "react-router-dom";
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
    if (this.model.isReady) {
      const squadID = this.model.squadID;
      return (
        <div className="squad-wrapper">
          <nav>
            <NavLink to={`/partier/squad/${squadID}`} activeClassName="active">View Squad</NavLink>
            <NavLink to={`/partier/squad/${squadID}/edit`} activeClassName="active">Edit Squad Name</NavLink>
            <NavLink to={`/partier/squad/${squadID}/members`} activeClassName="active">Manage Squad Members</NavLink>
            <NavLink to={`/partier/squad/${squadID}/filters`} activeClassName="active">Manage Filters</NavLink>
            <NavLink to={`/partier/squad/${squadID}/payouts`} activeClassName="active">Manage Payouts</NavLink>
            <NavLink to={`/partier/squad/${squadID}/social`} activeClassName="active">Manage Social Media Commitments</NavLink>
            <NavLink to={`/partier/squad/${squadID}/auction`} activeClassName="active">View Auction</NavLink>
            <NavLink to={`/partier/squad/${squadID}/party`} activeClassName="active">View Assigned Party</NavLink>
          </nav>
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
      );
    } else return null;
  }
}
