import { observer } from "mobx-react";
import * as React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
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
    return this.model.isReady ? (
      <Switch>
        <Route exact path="/promoter/parties/:partyID" render={(p) => <ShowParty model={this.model} {...p} />} />
        <Route exact path="/promoter/parties/:partyID/edit" render={(p) => <EditParty model={this.model} {...p} />} />
        <Route exact path="/promoter/parties/:partyID/filters" render={(p) => <EditFilters model={this.model} {...p} />} />
        <Route exact path="/promoter/parties/:partyID/photos" render={(p) => <EditPhotos model={this.model} {...p} />} />
        <Route exact path="/promoter/parties/:partyID/social" render={(p) => <EditSocial model={this.model} {...p} />} />
      </Switch>
    ) : null;
  }

}
