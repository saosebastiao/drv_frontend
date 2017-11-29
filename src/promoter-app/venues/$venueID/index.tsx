// tslint:disable:max-line-length
import { observer } from "mobx-react";
import * as React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import NavTab from "shared/NavTab";
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
          <nav className="navbar" role="navigation" aria-label="squad navigation">
            <div className="navbar-menu">
              <div className="navbar-start">
                <div className="tabs is-boxed">
                  <ul className="menu">
                    <NavTab to={`/promoter/venues/${venueID}`} >View Venue</NavTab>
                    <NavTab to={`/promoter/venues/${venueID}/edit`} >Edit Venue</NavTab>
                    <NavTab to={`/promoter/venues/${venueID}/filters`} >Manage Filters</NavTab>
                    <NavTab to={`/promoter/venues/${venueID}/photos`} >Manage Photos</NavTab>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <section className="section">
            <Switch>
              <Route exact path="/promoter/venues/:venueID" render={(p) => <ShowVenue model={this.model} {...p} />} />
              <Route exact path="/promoter/venues/:venueID/edit" render={(p) => <EditVenue model={this.model} {...p} />} />
              <Route exact path="/promoter/venues/:venueID/filters" render={(p) => <EditFilters model={this.model} {...p} />} />
              <Route exact path="/promoter/venues/:venueID/photos" render={(p) => <EditPhotos model={this.model} {...p} />} />
            </Switch>
          </section>
        </div>
      );
    } else return null;
  }
}
