import * as React from "react";
import { observer } from "mobx-react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import SquadID from "./$squadID";
import MenuTab from "shared/MenuTab";
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
        <MenuTab key={pn.partyNight} to={`/partier/squad/${pn.squadID}`}>
          {moment(pn.partyNight).format("ll")}
        </MenuTab>
      );
    } else {
      return (
        <MenuTab key={pn.partyNight} to={`/partier/squad/new/${pn.partyNight}`}>
          {moment(pn.partyNight).format("ll")}
        </MenuTab>
      );
    }
  }

  public render() {
    return (
      <div>
        <div className="columns">
          <div className="column is-narrow">
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
              <Route path="/partier/squad/new/:partyNight" render={(m) =>
                <NewSquad model={this.model} {...m} />} />
              <Route path="/partier/squad/:squadID" component={SquadID} />
            </Switch>
          </div>
        </div>
      </div >
    );
  }
}
