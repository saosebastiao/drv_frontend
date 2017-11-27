// tslint:disable:max-line-length
import { observer } from "mobx-react";
import * as React from "react";
import { Switch, Route, NavLink, RouteComponentProps } from "react-router-dom";
import ViewPartyModel from "./Model";
import ShowParty from "./default";
import EditParty from "./edit";
import EditFilters from "./filters";
import EditPhotos from "./photos";
import EditSocial from "./social";

interface PPartyID {
  partyID: number;
}

@observer
export default class PartyID extends React.Component<RouteComponentProps<PPartyID>, {}> {

  public model = new ViewPartyModel(this.props.match.params.partyID);

  public render() {
    if (this.model.isReady) {
      const partyID = this.model.partyID;
      return (
        <div>
          <nav>
            <NavLink to={`/promoter/parties/${partyID}`} activeClassName="active">View Party Profile</NavLink>
            <NavLink to={`/promoter/parties/${partyID}/edit`} activeClassName="active">Edit Party Profile</NavLink>
            <NavLink to={`/promoter/parties/${partyID}/filters`} activeClassName="active">Edit Party Filters</NavLink>
            <NavLink to={`/promoter/parties/${partyID}/photos`} activeClassName="active">Edit Party Photos</NavLink>
            <NavLink to={`/promoter/parties/${partyID}/social`} activeClassName="active">Edit Social Media Preferences</NavLink>
          </nav>

          <Switch>
            <Route exact path="/promoter/parties/:partyID" render={(p) => <ShowParty model={this.model} {...p} />} />
            <Route exact path="/promoter/parties/:partyID/edit" render={(p) => <EditParty model={this.model} {...p} />} />
            <Route exact path="/promoter/parties/:partyID/filters" render={(p) => <EditFilters model={this.model} {...p} />} />
            <Route exact path="/promoter/parties/:partyID/photos" render={(p) => <EditPhotos model={this.model} {...p} />} />
            <Route exact path="/promoter/parties/:partyID/social" render={(p) => <EditSocial model={this.model} {...p} />} />
          </Switch>
        </div>
      );
    } else return null;
  }

}
