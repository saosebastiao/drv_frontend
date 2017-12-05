import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import MenuTab from "shared/MenuTab";
import VenueID from "./$venueID";
import CreateVenue from "./create";
import ImportVenue from "./import";
import VenueListModel from "./Model";

@observer
export default class Venues extends React.Component<RouteComponentProps<any>, {}> {
  private model = new VenueListModel;

  public render() {
    return (
      <div>
        <div className="columns">
          <div className="column is-narrow">
            <aside className="menu">
              <div className="menu-list">
                <ul>
                  <MenuTab to={`/promoter/venues/create`}>
                    Create a new Venue
                  </MenuTab>
                  <MenuTab to={`/promoter/venues/import`}>
                    Import a new Venue
                  </MenuTab>
                </ul>
              </div>
              <div className="menu-label">
                View Your Venues
              </div>
              <ul className="menu-list">
                {
                  this.model.list.map((venue) => {
                    return (
                      <MenuTab key={venue.venueID}
                        to={`/promoter/venues/${venue.venueID}`}>
                        {venue.venueName}
                      </MenuTab>
                    );
                  })
                }
              </ul>
            </aside>
          </div>
          <div className="column">
            <Switch>
              <Route exact path="/promoter/venues/create" component={CreateVenue} />
              <Route exact path="/promoter/venues/import" component={ImportVenue} />
              <Route path="/promoter/venues/:venueID" component={VenueID} />
            </Switch>
          </div>
        </div>
      </div >
    );
  }
}
