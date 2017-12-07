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
                  <div className="tile is-child" onClick={this.setPhotoIdx(0)}>
                    {this.model.photos[0] ?
                      <img src={this.model.photos[0]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                  <div className="tile is-child" onClick={this.setPhotoIdx(1)}>
                    {this.model.photos[1] ?
                      <img src={this.model.photos[1]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                  <div className="tile is-child" onClick={this.setPhotoIdx(2)}>
                    {this.model.photos[2] ?
                      <img src={this.model.photos[2]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                  <div className="tile is-child" onClick={this.setPhotoIdx(3)}>
                    {this.model.photos[3] ?
                      <img src={this.model.photos[3]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                  <div className="tile is-child" onClick={this.setPhotoIdx(4)}>
                    {this.model.photos[4] ?
                      <img src={this.model.photos[4]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
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
