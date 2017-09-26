import { map as _map } from "lodash";
import * as React from "react";
import "./FacebookImageSelector.scss";

const ErrorMessages = {
  default: "Some error occured while loading, Please try again after some time.",
  notLoggedin: "You are not logged in!. Please log into Facebook and try again",
  unauthorized: "You have not authorized this app!. Please provide the required permission (user_photos)",
  noAppId: "No App Id specified",
  noPhoto: "No Photos available in this album"
};

interface PImageLoader {
  data: any;
  type: boolean;
  closeOverlay: () => void;
  itemSelector: (dataset: any) => void;
  albumSelector: () => void;
  onImageSelect: (url: any) => void;
  isError: boolean;
  customError: string;
  paging: any;

}
interface SImageLoader {
  showSpinner: boolean;
  loadMoreDataSpinner: boolean;
  isBorder: any;
  selectedId: number | null;
}

export default class ImageLoader extends React.Component<PImageLoader, SImageLoader> {

  constructor(props: PImageLoader) {
    super(props);
    this.state = {
      showSpinner: false,
      loadMoreDataSpinner: false,
      isBorder: {},
      selectedId: null
    };
  }

  public componentWillReceiveProps() {
    this.setState({ showSpinner: false, loadMoreDataSpinner: false });
  }

  public render() {
    const props: PImageLoader = this.props;
    const data: any = props.data;
    const state: SImageLoader = this.state;
    const type = this.props.type ? "album" : "photos";
    const allAlbums = _map(data, (value: any, key: any) => {
      let borderStyle = {};
      if (state.isBorder[key]) {
        borderStyle = { border: "2px solid #3B5998" };
      }
      return (
        <div
          className="block"
          key={type + key}
          onClick={this.albumSelector}
          onDoubleClick={this.photoSelector}
          data-type={type}
          data-id={key}
        >
          <div className="front-image" style={borderStyle}>
            <div>
              <img src={value.url || value.source} />
            </div>
          </div>
          {value.name && <div className="album-name">{value.name}</div>}
        </div>
      );
    });

    return (
      <div className="overlay">
        <div className="content">
          <header className="clearfix">
            <div className="cross" onClick={this.closeOverlay}>X</div>
            <div>Facebook photo selector</div>
          </header>
          <section>
            {(!props.type) ? <div className="heading">
              <div className="back" onClick={this.backAlbumSelector}>Back to albums</div>
              <div>Select a nice photo</div>
            </div>
              : <div className="heading"><div>Select an album</div></div>
            }
            <div className="block-parent">
              {(props.isError) ? <div className="block-container-error">{props.customError}</div> :
                (allAlbums && allAlbums.length > 0) ? (
                  <div
                    className="block-container"
                    ref="dataNode"
                  >
                    {allAlbums}
                  </div>
                ) :
                  <div className="block-container-error">{ErrorMessages.noPhoto}</div>}
              {state.showSpinner && <div className="block-container-spinner"><div className="loader" /></div>}
              {state.loadMoreDataSpinner && <div className="block-container-loadmore"><div className="loader" /></div>}
            </div>
          </section>
          <footer>
            <div onClick={this.closeOverlay}>Cancel</div>
            {!props.type && allAlbums && allAlbums.length > 0 && (
              <div className="selector" onClick={this.okSelector}>OK</div>
            )}
          </footer>
        </div>
        <div className="cover" />
      </div>
    );
  }

  public backAlbumSelector = () => {
    this.setState({ showSpinner: true });
    this.props.albumSelector();
  }

  public albumSelector = (e: any) => {
    const id = e.currentTarget.dataset.id;
    const border: any = {};
    if (this.props.type) {
      this.selector(e);
    } else {
      border[id] = true;
      this.setState({ isBorder: border, selectedId: id });
    }
  }

  public photoSelector = (e: any) => {
    if (!this.props.type) {
      this.selector(e);
    }
  }

  public okSelector = () => {
    if (this.state.selectedId) {
      this.setState({ showSpinner: true });
      this.props.itemSelector({ id: this.state.selectedId, type: "photo" });
    }
  }

  public selector = (e: any) => {
    this.setState({ showSpinner: true });
    this.props.itemSelector(e.currentTarget.dataset);
  }

  public closeOverlay = () => {
    this.props.closeOverlay();
  }

}
