import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ShowVenue from "./$venueID";
import EditVenue from "./$venueID/edit";
import CreateVenue from "./create";
import VenueList from "./default";

@observer
export default class Venues extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/promoter/venues" component={VenueList} />
        <Route exact path="/promoter/venues/create" component={CreateVenue} />
        <Route path="/promoter/venues/:venueID/edit" component={EditVenue} />
        <Route path="/promoter/venues/:venueID" component={ShowVenue} />
      </Switch>
    );
  }
}
