import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react";

interface PDefault extends RouteComponentProps<{
  partyNight?: string;
}> { }

@observer
export default class NewSquad extends React.Component<PDefault> {

  public render() {
    if (this.props.match.params.partyNight) {
      const partyNight = this.props.match.params.partyNight;
      return (
        <div>
          <div className="options-col">
            <Link to={`/partier/squad/create/${partyNight}`}>
              <button className="btn btn-primary">Create a squad</button>
            </Link>
            <Link to={`/partier/squad/invites/${partyNight}`}>
              <button className="btn btn-primary">View Squad Invites</button>
            </Link>
          </div>
        </div>
      );
    } else {
      return <div>Please Select a Date</div>;
    }
  }
}
