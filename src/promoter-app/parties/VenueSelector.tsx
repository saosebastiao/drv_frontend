import * as React from "react";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import NavTab from "shared/NavTab";
import PartyListModel from "./Model";

interface PPartyNight {
  partyNight: string;
}
interface PVenueSelector extends RouteComponentProps<PPartyNight> {
  model: PartyListModel;
}
@observer
export default class VenueSelector extends React.Component<PVenueSelector> {

  public render() {
    const partyNight = this.props.match.params.partyNight;
    const venues = this.props.model.venues;
    const partyList = this.props.model.partyNights.find(pn => pn.partyNight === partyNight);
    const parties = partyList && partyList.parties;
    return (
      <aside className="menu">
        <ul className="menu-list">
          {
            venues.map(v => {
              const party = parties && parties.find(p => p.venue.venueID === v.venueID);
              return party ? (
                <NavTab key={party.partyID} to={`/promoter/parties/${partyNight}/${party.partyID}`}>
                  {party.partyName} at {v.venueName}
                </NavTab>
              ) : (
                  <NavTab key={`v:${v.venueID}`}
                    to={`/promoter/parties/${partyNight}/create/${v.venueID}`}>
                    Create Party at {v.venueName}
                  </NavTab>
                );
            })

          }
        </ul>
      </aside>
    );
  }
}
