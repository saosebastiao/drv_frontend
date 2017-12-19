// tslint:disable:no-console
import * as React from "react";
import { observable, action, runInAction, autorun, toJS } from "mobx";
import { observer } from "mobx-react";
import AvatarEditor from "react-avatar-editor";
import FacebookImageSelector from "shared/facebook/FacebookImageSelector";
/*
  Test: tile layout
  Test: column layout
  Test: card with footer layout
  Scroll with click on main photo?
  Scroll with click on thumbnail array?
*/

interface PGallery {
  photos: Array<IPhoto>;
  pixels?: number;
  save: (photos: Array<IPhoto>) => void;
}
const defaultPhoto = "./images/profile-placeholder.png";

@observer
export default class GalleryEdit extends React.Component<PGallery> {
  public x = autorun(() => {
    console.log(toJS(this.photosCopy));
  });
  constructor(props: PGallery) {
    super(props);
    this.photosCopy = toJS(props.photos);
  }
  @action public componentWillReceiveProps(props: PGallery) {
    this.photosCopy = toJS(props.photos);
  }

  @action private onHideFacebookImageModal = () => {
    this.idxPhotoSelector = undefined;
  }
  @action private onImageSelect = (url: any) => {
    console.log(this.idxPhotoSelector);
    this.photosCopy[this.idxPhotoSelector as number] = url.source;
    this.idxSelection = this.idxPhotoSelector as number;
  }
  @action private setScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.scale = parseFloat(e.target.value);
  }
  @action private setPosition = (position: AvatarPosition) => {
    this.position = position;
  }
  @observable private range: number = 5;
  @observable private photosCopy: Array<IPhoto> = [];
  @observable private idxPhotoSelector?: number;
  @observable private idxSelection: number = 0;
  @observable private wStart: number = 0;
  @observable private wEnd: number = 5;
  @observable private scale: number = 1.0;
  @observable private position = { x: 0.5, y: 0.5 };
  private selectedPhoto = () => {
    if (this.photosCopy.length > this.idxSelection) {
      return this.photosCopy[this.idxSelection];
    } else return defaultPhoto;
  }
  private photoByIdx = (idx: number) => {
    if (this.photosCopy.length > idx) {
      return this.photosCopy[idx];
    } else return defaultPhoto;
  }
  @action public deletePhotoIdx = (idx: number) => () => {
    runInAction(() => {
      this.photosCopy.splice(idx, 1);
    });
  }
  @action private scrollRight = () => {
    const max = this.props.photos.length;
    this.wEnd = Math.min(this.wEnd + 1, max);
    this.wStart = Math.min(max - this.range, this.wStart + 1);
  }
  @action private scrollLeft = () => {
    const min = 0;
    this.wStart = Math.max(min, this.wStart - 1);
    this.wEnd = Math.max(this.wEnd - 1, min + this.range);
  }
  private save = () => {
    this.props.save(this.photosCopy);
  }

  public render() {
    return this.photosCopy ? (
      <div className="box">
        <div className="columns">
          <div className="column">
            <AvatarEditor image={this.selectedPhoto()}
              height={480}
              width={480}
              border={30}
              scale={this.scale}
              position={this.position}
              onPositionChange={this.setPosition}
              crossOrigin={"anonymous"}
            />
            <div className="field">
              <label className="label">Scale</label>
              <div className="control">
                <input type="range" value={this.scale} step={0.1} max={1.5} min={0.5} onChange={this.setScale} />
              </div>
            </div>
            <div className="columns is-gapless">
              <a className="column is-1"
                onClick={this.scrollLeft}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="icon is-small">
                  <i className="fa fa-chevron-left" />
                </span>
              </a>
              {
                [0, 1, 2, 3, 4].map((x) => {
                  return this.photoByIdx(x) ? (
                    <div key={x} className="column">
                      <figure key={x} className="image is-96x96"
                        style={{ border: x === this.idxPhotoSelector ? "1px solid #000" : "" }}>
                        <a className="delete" onClick={this.deletePhotoIdx(this.idxSelection)} />
                        <img src={this.photoByIdx(x)}
                          onClick={() => this.idxSelection = x} />
                      </figure>
                    </div>
                  ) : (
                      <a key={x}
                        className="column"
                        onClick={() => this.idxPhotoSelector = x}>
                        <figure
                          className="image is-96x96">
                          <img src={defaultPhoto} />
                        </figure>
                      </a>
                    );
                })
              }
              <a className="column is-1"
                onClick={this.scrollRight}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="icon is-small">
                  <i className="fa fa-chevron-right" />
                </span>
              </a>
            </div >
          </div >
        </div>
        <button className="button is-primary" onClick={this.save}>Save</button>
        <FacebookImageSelector
          getURL
          appId="1063753666981488"
          photoIdx={this.idxPhotoSelector}
          onCloseModal={this.onHideFacebookImageModal}
          onSelection={this.onImageSelect}
        />
      </div >
    ) : null;
  }

}
