import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import NavTab from "shared/NavTab";
import VenueID from "./$venueID";
import CreateVenue from "./create";
import ImportVenue from "./import";
import VenueListModel from "./Model";

@observer
export default class Venues extends React.Component<RouteComponentProps<any>, {}> {
  private model = new VenueListModel;

  public render() {
    return (
      <section className="section">
        <div className="columns">
          <div className="column is-one-fifth">
            <aside className="menu">
              <div className="menu-list">
                <ul>
                  <NavTab to={`/promoter/venues/create`}>
                    Create a new Venue
                  </NavTab>
                  <NavTab to={`/promoter/venues/import`}>
                    Import a new Venue
                  </NavTab>
                </ul>
              </div>
              <div className="menu-label">
                View Your Venues
              </div>
              <ul className="menu-list">
                {
                  this.model.list.map((venue) => {
                    return (
                      <NavTab key={venue.venueID}
                        to={`/promoter/venues/${venue.venueID}`}>
                        {venue.venueName}
                      </NavTab>
                    );
                  })
                }
              </ul>
            </aside>
          </div>
          <div className="column">
            <section className="section">
              <Switch>
                <Route exact path="/promoter/venues/create" component={CreateVenue} />
                <Route exact path="/promoter/venues/import" component={ImportVenue} />
                <Route path="/promoter/venues/:venueID" component={VenueID} />
              </Switch>
            </section>
          </div>
        </div>
      </section >
    );
  }
}
