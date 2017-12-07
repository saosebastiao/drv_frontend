import { range as _range } from "lodash";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import FacebookImageSelector from "shared/facebook/FacebookImageSelector";
import ProfileModel from "../Model";
import EditPhotosModel from "./Model";
import { getUserID } from "modules/DroverClient";
import PartierCard from "shared/cards/PartierCard";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditPhotos extends React.Component<PProfile> {
  private model = new EditPhotosModel;
  @observable public selIndex: number = -1;
  @observable public showFacebookImageModal: boolean = false;
  constructor(props: any) {
    super(props);
  }

  public onShowFacebookImageModal = (idx: number) => {
    this.showFacebookImageModal = true;
    this.selIndex = idx;
  }

  public onHideFacebookImageModal = () => {
    this.showFacebookImageModal = false;
  }

  public onImageSelect = (url: any) => {
    const idx = this.selIndex;
    if (this.props.model.photos.length > idx) {
      this.props.model.photos[idx] = url.source;
    } else {
      this.props.model.photos.push(url.source);
    }
  }

  public clickSave = async () => {
    await this.model.save();
    await this.props.model.refresh();
    this.props.history.push("/partier/profile");
    // go back
  }

  public renderOtherPhotos() {
    return (
      <div className="other-photos-container">
        <div className="other-photos-row">
          {
            _range(5).map((colIndex: number) => {
              if (this.props.model.otherPhotos.length > colIndex) {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${colIndex}`}
                  style={this.props.model.otherPhotos[colIndex]}
                  onClick={() => this.onShowFacebookImageModal(colIndex + 1)}
                />;
              } else {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${colIndex}`}
                  onClick={() => this.onShowFacebookImageModal(colIndex + 1)}
                />;
              }
            })
          }
        </div>
      </div>
    );
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
                  <div className="tile is-child">
                    <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                  </div>
                  <div className="tile is-child">
                    <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                  </div>
                  <div className="tile is-child">
                    <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                  </div>
                  <div className="tile is-child">
                    <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                  </div>
                  <div className="tile is-child">
                    <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="box">
            <h1 className="title">
              {this.props.model.name} &nbsp;
              <span className="icon">
                {this.props.model.gender === "female" ?
                  <i className="fa fa-venus" aria-hidden="true" /> : null}
                {this.props.model.gender === "male" ?
                  <i className="fa fa-mars" aria-hidden="true" /> : null}
              </span>
            </h1>
            <h2 className="subtitle">
              {this.props.model.defaultRegion}
            </h2>
            <div>
              <a
                className="btn btn-md btn-primary"
                href={`/api/partier/${getUserID()}/stripe`}
                target="_blank">
                {this.props.model.stripeAccountID ? "Manage Payment Account" : "Create Payment Account"}
              </a>
            </div>
          </div>
          {this.props.model.invitations.length > 0 ?
            <div className="box">
              <h2 className="subtitle">Invitations From Friends</h2>
              <ul className="list-group">
                {this.props.model.invitations.map((x) => {
                  return (<PartierCard key={x} userID={x} />);
                })}
              </ul>
            </div> : null
          }
          <div className="box">
            <h2 className="subtitle">Accepted Friends</h2>
            <ul className="list-group">
              {this.props.model.accepted.map((x) => {
                return (<PartierCard key={x} userID={x} />);
              })}
            </ul>
          </div>
        </div>
        {/*
        */}
        <FacebookImageSelector
          getURL
          appId="1063753666981488"
          onCloseModal={this.onHideFacebookImageModal}
          onSelection={this.onImageSelect}
        />
      </div >
    );
  }
}
