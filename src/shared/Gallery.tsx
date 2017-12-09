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
    return this.wStart + 4;
  }

  public render() {
    const { height, width } = this.props;
    return (
      <div style={{ height, width }}>
        <div className="box">
          <div className="column">
            <figure className="image is-square">
              <img src="https://bulma.io/images/placeholders/256x256.png" />
            </figure>
            <br />
            <div className="columns is-gapless">
              <div className="column">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <a className="button" >
                        <span className="icon is-small">
                          <i className="fa fa-chevron-left" />
                        </span>
                      </a>
                    </div>
                  </div>
                  {
                    this.props.photos.slice(this.wStart, this.wEnd).map((x, idx) => {
                      return (
                        <div key={idx} className="column is-one-fifth">
                          <figure className="image is-square">
                            <img src={x} />
                          </figure>
                        </div>
                      );
                    })}
                  <div className="level-item">
                    <a className="button" >
                      <span className="icon is-small">
                        <i className="fa fa-chevron-left" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >
    );
  }

}
