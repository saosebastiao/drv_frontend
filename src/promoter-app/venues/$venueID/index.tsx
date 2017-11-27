// tslint:disable:max-line-length
import { observer } from "mobx-react";
import * as React from "react";
import { NavLink, Switch, Route, RouteComponentProps } from "react-router-dom";
import ShowVenueModel from "./Model";
import ShowVenue from "./default";
import EditVenue from "./edit";
import EditFilters from "./filters";
import EditPhotos from "./photos";

interface PShowVenue {
  venueID: number;
}

@observer
export default class VenueID extends React.Component<RouteComponentProps<PShowVenue>, {}> {
  public model = new ShowVenueModel(this.props.match.params.venueID);

  public render() {
    if (this.model.isReady) {
      const venueID = this.model.venueID;
      return (
        <div>
          <nav>
            <NavLink to={`/promoter/venues/${venueID}`} activeClassName="active">View Venue Profile</NavLink>
            <NavLink to={`/promoter/venues/${venueID}/edit`} activeClassName="active">Edit Venue Profile</NavLink>
            <NavLink to={`/promoter/venues/${venueID}/filters`} activeClassName="active">Edit Venue Filters</NavLink>
            <NavLink to={`/promoter/venues/${venueID}/photos`} activeClassName="active">Edit Venue Photos</NavLink>
          </nav>
          <Switch>
            <Route exact path="/promoter/venues/:venueID" render={(p) => <ShowVenue model={this.model} {...p} />} />
            <Route exact path="/promoter/venues/:venueID/edit" render={(p) => <EditVenue model={this.model} {...p} />} />
            <Route exact path="/promoter/venues/:venueID/filters" render={(p) => <EditFilters model={this.model} {...p} />} />
            <Route exact path="/promoter/venues/:venueID/photos" render={(p) => <EditPhotos model={this.model} {...p} />} />
          </Switch>
        </div>
      );
    } else return null;
  }
}
