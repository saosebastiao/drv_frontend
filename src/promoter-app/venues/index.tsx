import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ShowVenue from "./$venueID";
import EditVenue from "./$venueID/edit";
import EditVenueFilters from "./$venueID/filters";
import EditVenuePhotos from "./$venueID/photos";
import CreateVenue from "./create";
import ImportVenue from "./import";
import VenueList from "./default";

@observer
export default class Venues extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/promoter/venues" component={VenueList} />
        <Route exact path="/promoter/venues/create" component={CreateVenue} />
        <Route exact path="/promoter/venues/import" component={ImportVenue} />
        <Route path="/promoter/venues/:venueID/edit" component={EditVenue} />
        <Route path="/promoter/venues/:venueID/photos" component={EditVenuePhotos} />
        <Route path="/promoter/venues/:venueID/filters" component={EditVenueFilters} />
        <Route path="/promoter/venues/:venueID" component={ShowVenue} />
      </Switch>
    );
  }
}
