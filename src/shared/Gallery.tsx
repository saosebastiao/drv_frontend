import * as React from "react";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";

interface PGallery {
  photos: Array<string>;
  height?: number;
  width?: number;
}

@observer
export default class Gallery extends React.Component<PGallery> {
  @observable public idx: number;
  @observable public wStart: number = 0;
  @computed get wEnd() {
    return this.wStart + 5;
  }

  public render() {
    const { height, width } = this.props;
    return (
      <div style={{ height, width }}>
        <div className="box">
          <div className="columns">
            <div className="column">
              <figure className="image is-square">
                <img src="https://bulma.io/images/placeholders/256x256.png" />
              </figure>
              <div className="columns is-gapless">
                {this.props.photos.length > 5 ? (
                  <div className="column is-1"
                    style={{ "display": "flex", "align-items": "center", "justify-content": "center" }}>
                    <span className="icon is-small">
                      <i className="fa fa-chevron-left" />
                    </span>
                  </div>) : null
                }
                {
                  this.props.photos.slice(this.wStart, this.wEnd).map((x, idx) => {
                    return (
                      <div key={idx} className="column">
                        <figure className="image is-square">
                          <img src={x} />
                        </figure>
                      </div>
                    );
                  })}
                {this.props.photos.length > 5 ? (
                  <div className="column is-1"
                    style={{ "display": "flex", "align-items": "center", "justify-content": "center" }}>
                    <span className="icon is-small">
                      <i className="fa fa-chevron-right" />
                    </span>
                  </div>) : null
                }
              </div >
            </div >
          </div >
        </div >
      </div >
    );
  }

}
