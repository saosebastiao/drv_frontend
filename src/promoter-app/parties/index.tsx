import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import * as moment from "moment";
import PartyID from "./$partyID";
import CreateParty from "./create";
import ImportParty from "./import";
import PartyListModel from "./Model";

@observer
export default class Parties extends React.Component<RouteComponentProps<{}>, {}> {
  private model = new PartyListModel;

  private changeVenue = (e: any) => {
    const venueID = parseInt(e.target.value, 10);
    this.model.venueID = venueID;
  }
  private changePartyNight = (e: any) => {
    const partyNight = e.target.value;
    this.model.partyNight = partyNight;
  }
  private renderPartyNight(partyNight: string) {
    return (
      <option key={partyNight} value={partyNight}>
        {moment(partyNight).format("ll")}
      </option>
    );
  }
  private renderVenue(venue: IVenue) {
    return (
      <option key={venue.venueID} value={venue.venueID}>
        {venue.venueName}
      </option>
    );
  }

  public render() {
    return (
      <section className="section" >
        <div className="columns">
          <div className="column is-narrow">
            <div>Select a Party Night</div>
            <div className="select">
              <select onChange={this.changePartyNight} value={this.model.partyNight}>
                {
                  this.model.partyNights.map(pn => this.renderPartyNight(pn.partyNight))
                }
              </select>
            </div>
          </div>
          <div className="column is-narrow">
            <div>Select a Venue</div>
            <div className="select">
              <select onChange={this.changeVenue} value={this.model.partyNight}>
                {
                  this.model.venues.map(v => this.renderVenue(v))
                }
              </select>
            </div>
          </div>
          <div className="column">
            <Switch>
              <Route path="/promoter/parties/import/" component={ImportParty} />
              <Route path="/promoter/parties/create" render={(m) => <CreateParty model={this.model} {...m} />} />
              <Route path="/promoter/parties/:partyID" component={PartyID} />
            </Switch>
          </div>
        </div>
      </section>
    );
  }
}
