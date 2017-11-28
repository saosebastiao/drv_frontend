import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import SquadID from "./$squadID";
import NavTab from "shared/NavTab";
import NewSquad from "./default";
import SquadListModel from "./Model";
import * as moment from "moment";

interface IPartyNight {
  partyNight: string;
  squadID?: number;
}

@observer
export default class Squad extends React.Component<RouteComponentProps<{}>, {}> {
  private model = new SquadListModel;

  private renderPartyNight(pn: IPartyNight) {
    if (pn.squadID) {
      return (
        <NavTab key={pn.partyNight} to={`/partier/squad/${pn.squadID}`}>
          {moment(pn.partyNight).format("ll")}
        </NavTab>
      );
    } else {
      return (
        <NavTab key={pn.partyNight} to={`/partier/squad/new/${pn.partyNight}`}>
          {moment(pn.partyNight).format("ll")}
        </NavTab>
      );
    }
  }

  public render() {
    return (
      <div className="squad">
        <div className="menu-column">
          <aside className="squad-menu">
            <ul className="date-list">
              {
                this.model.list.map(pn => this.renderPartyNight(pn))
              }
            </ul>
          </aside>
        </div>
        <div className="squad-view">
          <Switch>
            <Route path="/partier/squad/new/:partyNight" component={NewSquad} />
            <Route path="/partier/squad/:squadID" component={SquadID} />
          </Switch>
        </div>
      </div >
    );
  }
}
