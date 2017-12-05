import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import * as moment from "moment";
import PartyID from "./$partyID";
import CreateParty from "./create";
import ImportParty from "./import";
import PartyListModel from "./Model";
import NavTab from "shared/NavTab";
import * as qs from "qs";

@observer
export default class Parties extends React.Component<RouteComponentProps<{}>, {}> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);
  }
  private model = new PartyListModel;
  public componentWillReceiveProps(next: RouteComponentProps<{}>) {
    const { partyNight, venueID } = qs.parse(next.location.search.slice(1));
    // tslint:disable-next-line:no-console
    console.log(partyNight, venueID);
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
    const changeVenue = () => {
      this.model.venueID = venue.venueID;
    };
    const hasParty = this.model.partyList &&
      this.model.partyList.find(x => x.venue.venueID === venue.venueID);
    if (hasParty) {
      return (
        <div key={hasParty.partyID} onClick={changeVenue}>
          <NavTab to={`/promoter/parties/${hasParty.partyID}`}>
            {hasParty.partyName} at {venue.venueName}
          </NavTab>
        </ div>
      );
    } else {
      return (
        <div key={`v:${venue.venueID}`} onClick={changeVenue}>
          <NavTab to={`/promoter/parties/create`}>
            Create Party at {venue.venueName}
          </NavTab>
        </ div>
      );
    }
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
            <div className="menu">
              <ul>
                {
                  this.model.venues.map(v => this.renderVenue(v))
                }
              </ul>
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
