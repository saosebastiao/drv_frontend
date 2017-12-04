// tslint:disable:max-line-length
import { observer } from "mobx-react";
import * as React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import NavTab from "shared/NavTab";
import ViewPartyModel from "./Model";
import ShowParty from "./default";
import EditParty from "./edit";
import EditFilters from "./filters";
import EditPhotos from "./photos";
import EditSocial from "./social";
import Auction from "./auction";

interface PPartyID {
  partyID: number;
  partyNight: string;
}

@observer
export default class PartyID extends React.Component<RouteComponentProps<PPartyID>, {}> {

  public model = new ViewPartyModel(this.props.match.params.partyID);

  public render() {
    if (this.model.isReady) {
      const partyID = this.props.match.params.partyID;
      return (
        <div>
          <nav className="navbar" role="navigation" aria-label="squad navigation">
            <div className="navbar-menu">
              <div className="navbar-start">
                <div className="tabs is-boxed">
                  <ul className="menu">
                    <NavTab to={`/promoter/parties/${partyID}`}>View Party Profile</NavTab>
                    <NavTab to={`/promoter/parties/${partyID}/edit`}>Edit Party Profile</NavTab>
                    <NavTab to={`/promoter/parties/${partyID}/filters`}>Edit Party Filters</NavTab>
                    <NavTab to={`/promoter/parties/${partyID}/photos`}>Edit Party Photos</NavTab>
                    <NavTab to={`/promoter/parties/${partyID}/social`}>Edit Social Media Preferences</NavTab>
                    <NavTab to={`/promoter/parties/${partyID}/auction`}>Auction</NavTab>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <section className="section">
            <Switch>
              <Route exact path="/promoter/parties/:partyID" render={(p) => <ShowParty model={this.model} {...p} />} />
              <Route exact path="/promoter/parties/:partyID/edit" render={(p) => <EditParty model={this.model} {...p} />} />
              <Route exact path="/promoter/parties/:partyID/filters" render={(p) => <EditFilters model={this.model} {...p} />} />
              <Route exact path="/promoter/parties/:partyID/photos" render={(p) => <EditPhotos model={this.model} {...p} />} />
              <Route exact path="/promoter/parties/:partyID/social" render={(p) => <EditSocial model={this.model} {...p} />} />
              <Route exact path="/promoter/parties/:partyID/auction" render={(p) => <Auction {...p} />} />
            </Switch>
          </section>
        </div>
      );
    } else return null;
  }

}
