import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditFiltersModel from "./Model";
import ViewSquadModel from "../Model";

interface PEditFilters extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class EditFilters extends React.Component<PEditFilters> {
  private model = new EditFiltersModel(this.props.model.squadID);

  public render() {
    return this.model.isReady ? (
      <div className="box">
        Filters Placeholder
      </div>
    ) : null;
  }
}
