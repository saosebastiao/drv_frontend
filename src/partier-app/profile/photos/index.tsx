import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import FacebookImageSelector from "shared/facebook/FacebookImageSelector";
import ProfileModel from "../Model";
import EditPhotosModel from "./Model";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditPhotos extends React.Component<PProfile> {
  private model = new EditPhotosModel;
  @observable private idx: number | undefined;
  constructor(props: any) {
    super(props);
  }

  private onHideFacebookImageModal = () => {
    this.idx = undefined;
  }

  private setPhotoIdx = (idx: number) => () => this.idx = idx;

  private deletePhotoIdx = (idx: number) => () => this.model.photos[idx] = undefined;

  private onImageSelect = (url: any) => {
    const idx = this.idx || -1;
    if (this.model.photos.length > idx) {
      this.model.photos[idx] = url.source;
    } else {
      this.model.photos.push(url.source);
    }
  }

  public save = async () => {
    await this.model.save();
    await this.props.model.refresh();
    this.props.history.push("/partier/profile");
    // go back
  }

  public render() {
    return (
      <div className="columns">
        <div className="column is-4">
          <div className="box">
            <div className="tile is-ancestor is-verticle">
              <div className="tile is-parent is-vertical">
                <div className="box">
                  <div className="tile">
                    <img src="https://bulma.io/images/placeholders/640x480.png" alt="Placeholder image" />
                  </div>
                </div>
                <div className="tile is-parent">
                  {[0, 1, 2, 3, 4].map(idx =>
                    <div key={idx} className="tile is-child">
                      {this.model.photos[idx] ?
                        <figure className="image is-square">
                          <img src={this.model.photos[idx]} onClick={this.setPhotoIdx(idx)} />
                          <a className="delete" onClick={this.deletePhotoIdx(idx)} />
                        </figure> :
                        <img src="https://bulma.io/images/placeholders/256x256.png" onClick={this.setPhotoIdx(idx)} />
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="button" onClick={this.save}>Save</button>
        </div>
        <div className="column is-4">
          {/* */}
          <FacebookImageSelector
            getURL
            appId="1063753666981488"
            photoIdx={this.idx}
            onCloseModal={this.onHideFacebookImageModal}
            onSelection={this.onImageSelect}
          />
        </div >
      </div>
    );
  }
}
