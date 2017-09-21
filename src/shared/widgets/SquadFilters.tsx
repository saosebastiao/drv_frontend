import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import Logger from "modules/Logger";
import * as React from "react";
import { transformSetToFilter } from "shared/Utils";

interface PSquadFilters {
  isOwned: boolean;
  filters: ISquadFilters;
}

@observer
export default class SquadFilters extends React.Component<PSquadFilters, {}>{
  @observable public editable: boolean = false;
  @observable public editMode: boolean = false;
  @observable public inAuction: boolean = true;
  @observable public minimumPrice: number = 0;
  @observable public venueBlacklist: Set<number> = new Set();
  @observable public musicTypes: Set<string> = new Set();
  @observable public venueTypes: Set<string> = new Set();
  @observable public interactionTypes: Set<string> = new Set();
  @action public toggleInAuction = () => {
    this.inAuction = !this.inAuction;
  }
  @action public setMinPrice = (e: any) => {
    this.minimumPrice = e.target.value;
  }
  @action public toggleEditMode = () => {
    this.editMode = !this.editMode;
  }
  public save = async () => {
    const venueBlacklist = transformSetToFilter(this.venueBlacklist);
    const musicTypes = transformSetToFilter(this.musicTypes);
    const venueTypes = transformSetToFilter(this.venueTypes);
    const interactionTypes = transformSetToFilter(this.venueTypes);
    const data: ISquadFilters = { venueBlacklist, musicTypes, venueTypes, interactionTypes };
    runInAction(() => {
      this.editMode = false;
    });
    Logger.info(JSON.stringify(data));
  }

  public componentWillMount() {
    runInAction(() => {
      if (this.props.isOwned) {
        this.editable = true;
      }
      this.venueBlacklist = new Set(this.props.filters.venueBlacklist);
      this.musicTypes = new Set(this.props.filters.musicTypes);
      this.venueTypes = new Set(this.props.filters.venueTypes);
      this.interactionTypes = new Set(this.props.filters.interactionTypes);
    });
  }

  public render() {
    if (this.editMode) {
      return (
        <div>
          <div>Squad Filters</div>
          <div>
            <div>Participate in Auction</div>
            <div>
              <label>
                <input
                  type="radio"
                  name="auction"
                  checked={this.inAuction}
                  onChange={this.toggleInAuction}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="auction"
                  checked={!this.inAuction}
                  onChange={this.toggleInAuction}
                />
                No
              </label>
            </div>
          </div>
          {this.venueBlacklist.size > 0 ?
            <div>
              <div>Venue Blacklist</div>
            </div>
            : null}
          <div>
            <div>Minimum Price</div>
            <label>
              $
              <input
                type="number"
                value={this.minimumPrice}
                onChange={this.setMinPrice}
                min={0}
                step={5}
              />
            </label>
          </div>
          <button type="button" onClick={this.save}>Save</button>
        </div>
      );
    } else {
      return (
        <div>
          <div>Squad Filters</div>
          {this.editable ?
            <button type="button" onClick={this.toggleEditMode}>Edit</button> :
            null
          }
        </div>
      );
    }
  }
}
