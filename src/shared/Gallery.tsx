// tslint:disable:no-console
import * as React from "react";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import PhotoContainer from "./PhotoContainer";
/*
  Test: tile layout
  Test: column layout
  Test: card with footer layout
  Scroll with click on main photo?
  Scroll with click on thumbnail array?
*/

interface PGallery {
  photos: Array<IPhoto>;
  height?: number;
  width?: number;
  range?: number;
}
const defaultPhoto = { url: "./images/profile-placeholder.png" };

@observer
export default class Gallery extends React.Component<PGallery> {
  public static defaultProps: PGallery = {
    range: 5,
    height: 480,
    width: 480,
    photos: []
  };
  constructor(props: PGallery) {
    super(props);
    Object.assign(this, Gallery.defaultProps, props);
  }
  public componentWillReceiveProps(props: PGallery) {
    Object.assign(this, Gallery.defaultProps, props);
  }
  @observable private range: number = 5;
  @observable private photos: Array<IPhoto>;
  @observable private idx: number = 0;
  @observable private wStart: number = 0;
  @observable private wEnd: number = 5;
  @computed get selectedPhoto() {
    return this.photos[this.idx] || defaultPhoto;
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

  public render() {
    const { height, width } = this.props;
    return this.photos ? (
      <div style={{ height, width }}>
        <div className="box">
          <div className="columns">
            <div className="column">
              <PhotoContainer url={this.selectedPhoto.url}
                pixels={480}
                x={50}
                y={50}
              />
              <div className="columns is-gapless">
                {this.props.photos.length > 5 ? (
                  <a className="column is-1"
                    onClick={this.scrollLeft}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="icon is-small">
                      <i className="fa fa-chevron-left" />
                    </span>
                  </a>) : null
                }
                {
                  this.props.photos.map((x, idx) => {
                    return idx >= this.wStart && idx < this.wEnd ? (
                      <a key={idx}
                        className="column"
                        onClick={() => this.idx = idx}>
                        <figure
                          className="image is-96x96"
                          style={{ border: idx === this.idx ? "1px solid #000" : "" }}>
                          <img src={x.url} />
                        </figure>
                      </a>
                    ) : null;
                  })
                }
                {this.props.photos.length > 5 ? (
                  <a className="column is-1"
                    onClick={this.scrollRight}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="icon is-small">
                      <i className="fa fa-chevron-right" />
                    </span>
                  </a>) : null
                }
              </div >
            </div >
          </div >
        </div >
      </div >
    ) : null;
  }

}
