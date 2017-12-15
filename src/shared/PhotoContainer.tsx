// tslint:disable:no-console
import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
/*
  Test: tile layout
  Test: column layout
  Test: card with footer layout
  Scroll with click on main photo?
  Scroll with click on thumbnail array?
*/

// const defaultPhoto = { url: "./images/profile-placeholder.png" };

interface PPhoto {
  pixels: number;
  url: string;
  x?: number;
  y?: number;
  scale?: number;
}

@observer
export default class PhotoContainer extends React.Component<PPhoto> {
  @observable private height: number = 0;
  @observable private width: number = 0;

  private onImgLoad = (e: any) => {
    this.width = e.target && e.target.naturalWidth;
    this.height = e.target && e.target.naturalHeight;
    console.log(e.target.naturalHeight);
    console.log(e.target.naturalWidth);
  }

  public render() {

    const x = this.props.x || 50;
    const y = this.props.y || 50;
    const scale = this.props.scale || 1;
    const { url, pixels } = this.props;
    const marginLeft = `${Math.round((this.width - pixels) * ((x - 100) / 100))}px`;
    const marginRight = `${Math.round((this.width - pixels) * (100 - x) / 100)}px`;
    const marginTop = `${Math.round((this.height - pixels) * (y - 100) / 100)}px`;
    const marginBottom = `${Math.round((this.height - pixels) * (100 - y) / 100)}px`;
    const style = {
      width: this.width * scale, height: this.height * scale,
      marginTop, marginBottom, marginLeft, marginRight
    };
    return (
      <div style={{ width: pixels, height: pixels, overflow: "hidden" }}>
        <figure
          style={style}
          className="image is-square">
          <img onLoad={e => this.onImgLoad(e)} src={url} />
        </figure>
      </div>
    );
  }

}
