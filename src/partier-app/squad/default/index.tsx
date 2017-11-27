import * as React from "react";
import { RouteComponentProps, Switch, Route } from "react-router-dom";
import NavTab from "shared/NavTab";
import { observer } from "mobx-react";
import * as moment from "moment";
import SquadListModel from "./Model";

@observer
export default class SquadList extends React.Component<RouteComponentProps<{}>, {}> {
  public model = new SquadListModel;
  public render() {

    return (
      <div className="squad-list">
        {
          this.model.list.map((partyNight: any) => {
            return (
              <div className="date-row" key={partyNight.partyNight}>
                <div className="date-col">{moment(partyNight.partyNight).format("YYYY-MM-DD")}</div>
                <div className="options-col">
                  {partyNight.squadID ? (
                    <NavTab to={`/partier/squad/${partyNight.squadID}`}>
                      <button className="btn btn-primary">View your squad</button>
                    </NavTab>) :
                    <NavTab to={`/partier/squad/create/${partyNight.partyNight}`}>
                      <button className="btn btn-primary">Create a squad</button>
                    </NavTab>}
                  {partyNight.invites > 0 ? (
                    <NavTab to={`/partier/squad/invites/${partyNight.partyNight}`}>
                      <button className="btn btn-primary">View squad invites</button>
                    </NavTab>
                  ) : null}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
