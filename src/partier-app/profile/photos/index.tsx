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

  private deletePhotoIdx = (idx: number) => () => this.model.photos.splice(idx, 1);

  private onImageSelect = (url: any) => {
    // tslint:disable-next-line:no-console
    console.log(url);
    const x = this.model.photos.push({ url: url.source });
    // tslint:disable-next-line:no-console
    console.log(x);
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
            {this.model.photos.map((photo, idx) =>
              <div key={idx} className="box">
                <figure className="image is-square">
                  <img src={photo.url} onClick={this.setPhotoIdx(idx)} />
                  <a className="delete" onClick={this.deletePhotoIdx(idx)} />
                </figure>
                <img src="https://bulma.io/images/placeholders/256x256.png" onClick={this.setPhotoIdx(idx)} />
              </div>
            )}
            <div className="box">
              <img src="https://bulma.io/images/placeholders/256x256.png"
                onClick={this.setPhotoIdx(this.model.photos.length)} />
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
