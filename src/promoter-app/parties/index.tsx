import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import * as moment from "moment";
import NavTab from "shared/NavTab";
import PartyID from "./$partyID";
import CreateParty from "./create";
import ImportParty from "./import";
import PartyListModel from "./Model";
import VenueSelector from "./VenueSelector";

@observer
export default class Parties extends React.Component<RouteComponentProps<{}>, {}> {
  private model = new PartyListModel;

  private renderPartyNight(partyNight: string) {
    return (
      <NavTab key={partyNight} to={`/promoter/parties/${partyNight}`}>
        {moment(partyNight).format("ll")}
      </NavTab>
    );
  }

  public render() {
    return (
      <section className="section" >
        <div className="columns">
          <div className="column is-narrow">
            <aside className="menu">
              <ul className="menu-list">
                {
                  this.model.partyNights.map(pn => this.renderPartyNight(pn.partyNight))
                }
              </ul>
            </aside>
          </div>
          <div className="column is-narrow">
            <Route path="/promoter/parties/:partyNight/"
              render={(m) => <VenueSelector model={this.model} {...m} />} />
          </div>
          <div className="column">
            <Switch>
              <Route path="/promoter/parties/import/" component={ImportParty} />
              <Route path="/promoter/parties/:partyNight/create/:venueID" component={CreateParty} />
              <Route path="/promoter/parties/:partyNight/:partyID" component={PartyID} />
            </Switch>
          </div>
        </div>
      </section>
    );
  }
}
