import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import * as moment from "moment";
import NavTab from "shared/NavTab";
import PartyID from "./$partyID";
import CreateParty from "./create";
import ImportParty from "./import";
import PartyListModel from "./Model";

@observer
export default class Squad extends React.Component<RouteComponentProps<{}>, {}> {
  private model = new PartyListModel;

  private renderPartyNight(pn: IPromoterPartyNight) {
    return (
      <div className="squad-row" key={pn.partyNight}>
        <div className="date-col">{moment(pn.partyNight).format("ll")}</div>
        <div className="button-col">
          {pn.parties.map((party) => {
            return <NavTab key={party.partyID} to={`/promoter/parties/${party.partyID}`}>
              View {party.partyName} at {party.venue.venueName}
            </NavTab>;
          })}
          <NavTab to={`/promoter/parties/create/${pn.partyNight}`}>
            Create a Party
          </NavTab>
        </div>
      </div >
    );
  }

  public render() {
    return (
      <section className="section">
        <div className="columns">
          <div className="column is-one-fifth">
            <aside className="menu">
              <ul className="menu-list">
                {
                  this.model.list.map(pn => this.renderPartyNight(pn))
                }
              </ul>
            </aside>
          </div>
          <div className="column">
            <Switch>
              <Route path="/promoter/parties/import/" component={ImportParty} />
              <Route path="/promoter/parties/create/:partyNight" component={CreateParty} />
              <Route path="/promoter/parties/:partyID" component={PartyID} />
            </Switch>
          </div>
        </div>
      </section >
    );
  }
}
