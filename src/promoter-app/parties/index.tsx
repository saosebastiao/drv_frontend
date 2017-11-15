import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ViewParty from "./$partyID";
import EditParty from "./$partyID/edit";
import EditPartyFilters from "./$partyID/filters";
import EditPartyPhotos from "./$partyID/photos";
import EditPartySocial from "./$partyID/social";
import Auction from "./$partyID/auction";
import CreateParty from "./create";
import ImportParty from "./import";
import PartyList from "./default";

export default class Party extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <div className="squad-wrapper">
        <Switch>
          <Route exact path="/promoter/parties" component={PartyList} />
          <Route path="/promoter/parties/import/" component={ImportParty} />
          <Route path="/promoter/parties/create/:partyNight" component={CreateParty} />
          <Route path="/promoter/parties/:partyID/edit" component={EditParty} />
          <Route path="/promoter/parties/:partyID/filters" component={EditPartyFilters} />
          <Route path="/promoter/parties/:partyID/photos" component={EditPartyPhotos} />
          <Route path="/promoter/parties/:partyID/social" component={EditPartySocial} />
          <Route path="/promoter/parties/:partyID/auction" component={Auction} />
          <Route path="/promoter/parties/:partyID" component={ViewParty} />
        </Switch>
      </div>
    );
  }

}
