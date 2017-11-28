// tslint:disable:max-line-length
import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import NavTab from "shared/NavTab";
import EditSquad from "./edit";
import EditFilters from "./filters";
import EditMembers from "./members";
import EditPayouts from "./payouts";
import EditSocial from "./social";
import ViewSquad from "./default";
import ViewAuction from "./auction";
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
        <div>
          <nav className="navbar" role="navigation" aria-label="squad navigation">
            <div className="navbar-menu">
              <div className="navbar-start">
                <div className="tabs is-boxed">
                  <ul className="menu">
                    <NavTab to={`/partier/squad/${squadID}`} >View Squad</NavTab>
                    <NavTab to={`/partier/squad/${squadID}/edit`} >Edit Squad Name</NavTab>
                    <NavTab to={`/partier/squad/${squadID}/members`} >Manage Squad Members</NavTab>
                    <NavTab to={`/partier/squad/${squadID}/filters`} >Manage Filters</NavTab>
                    <NavTab to={`/partier/squad/${squadID}/payouts`} >Manage Payouts</NavTab>
                    <NavTab to={`/partier/squad/${squadID}/social`} >Manage Social Media Commitments</NavTab>
                    <NavTab to={`/partier/squad/${squadID}/auction`} >View Auction</NavTab>
                    <NavTab to={`/partier/squad/${squadID}/party`} >View Assigned Party</NavTab>
                  </ul>
                </div>
              </div>
            </div>
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
