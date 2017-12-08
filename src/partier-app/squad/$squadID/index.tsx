// tslint:disable:max-line-length
import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import NavTab from "shared/NavTab";
import EditSquad from "./edit";
import EditFilters from "./filters";
import EditPayouts from "./payouts";
import EditSocial from "./social";
import ViewSquad from "./default";
import ViewAuction from "./auction";
import ViewAssignedPartyModel from "./party";
import ViewSquadModel from "./Model";

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
                  <ul>
                    <NavTab exact to={`/partier/squad/${squadID}`} >View Squad</NavTab>
                    {this.model.isOwned ? <NavTab to={`/partier/squad/${squadID}/edit`} >Edit Squad</NavTab> : null}
                    {this.model.isOwned ? <NavTab to={`/partier/squad/${squadID}/filters`} >Edit Filters</NavTab> : null}
                    {this.model.isOwned ? <NavTab to={`/partier/squad/${squadID}/payouts`} >Edit Payouts</NavTab> : null}
                    <NavTab to={`/partier/squad/${squadID}/social`} >Manage Social Media Commitments</NavTab>
                    <NavTab to={`/partier/squad/${squadID}/auction`} >View Auction</NavTab>
                    {this.model.winningBid ? <NavTab to={`/partier/squad/${squadID}/party`} >View Assigned Party</NavTab> : null}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <div>
            <Switch>
              <Route exact path="/partier/squad/:squadID" render={(p) => <ViewSquad model={this.model} {...p} />} />
              <Route exact path="/partier/squad/:squadID/edit" render={(p) => <EditSquad model={this.model} {...p} />} />
              <Route exact path="/partier/squad/:squadID/filters" render={(p) => <EditFilters model={this.model} {...p} />} />
              <Route exact path="/partier/squad/:squadID/payouts" render={(p) => <EditPayouts model={this.model} {...p} />} />
              <Route exact path="/partier/squad/:squadID/social" render={(p) => <EditSocial model={this.model} {...p} />} />
              <Route exact path="/partier/squad/:squadID/auction" render={(p) => <ViewAuction model={this.model} {...p} />} />
              <Route exact path="/partier/squad/:squadID/party" render={(p) => <ViewAssignedPartyModel model={this.model} {...p} />} />
            </Switch>
          </div>
        </div>
      );
    } else return null;
  }
}
