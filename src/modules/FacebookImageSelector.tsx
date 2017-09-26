import { extend as _extend } from "lodash";
import { observer } from "mobx-react";
import Logger from "modules/Logger";
import * as React from "react";
import "./FacebookImageSelector.scss";
import ImageLoader from "./ImageLoader";

const ErrorMessages = {
  default: "Some error occured while loading, Please try again after some time.",
  notLoggedin: "You are not logged in!. Please log into Facebook and try again",
  unauthorized: "You have not authorized this app!. Please provide the required permission (user_photos)",
  noAppId: "No App Id specified",
  noPhoto: "No Photos available in this album"
};

interface PFacebookImageSelector {
  getURL: boolean;
  appId: string;
  onCloseModal: () => void;
  onSelection: (url: any) => void;
}

interface SFacebookImageSelector {
  albumsLoaded: boolean;
  showOverlay: boolean;
  showError: boolean;
  albumDataLoaded: any;
  photoDataLoaded: any;
  albumPaging: any;
  photoPaging: any;
  customError: string;
}

@observer
export default class FacebookImageSelector extends React.Component<PFacebookImageSelector, SFacebookImageSelector> {

  constructor(props: PFacebookImageSelector) {
    super(props);
    this.state = {
      albumsLoaded: true,
      showOverlay: false,
      showError: false,
      albumDataLoaded: {},
      photoDataLoaded: {},
      albumPaging: {},
      photoPaging: {},
      customError: ""
    };
  }

  public componentDidMount() {
    this.getUserAlbums({});
  }

  public getUserAlbums(query: any) {
    const auth = FB.getAuthResponse();
    const uid = auth.userID;
    const queryObj = { fields: "id, name" };

    _extend(queryObj, query);

    FB.api("/" + uid + "/albums", queryObj,
      (response: any) => {
        if (response && !response.error) {
          this.populateAlbums(response);
        } else {
          this.showError(null);
        }
      });
  }

  public populateAlbums = (response: any) => {
    const task: any = [];
    const data = response.data;

    for (const i in data) {
      if (data[i]) {
        task.push(new Promise((resolve, reject) => {
          const temp = data[i];
          const albumId = temp.id;
          FB.api("/" + albumId + "/picture", {
            type: "album"
          }, (r: any) => {
            const res: any = {};
            if (r && !r.error) {
              /* handle the result */
              res.name = temp.name;
              res.url = r.data.url;
              res.id = temp.id;
              resolve(res);
            } else {
              reject(r.error);
            }
          });
        }));
      }
    }
    return Promise.all(task)
      .then((results) => {
        const albums: any = {};
        results.forEach((album: any) => albums[album.id] = album);
        this.setState({
          showOverlay: true,
          showError: false,
          albumDataLoaded: _extend(this.state.albumDataLoaded, albums)
        });
      })
      .catch((error) => {
        Logger.error(`populateAlbums error ${error}`);
        this.showError(null);
      });
  }

  public closeOverlay = () => this.props.onCloseModal();

  public getPhotosFromAlbum = (id: any, query: any) => {
    const queryObj = { fields: "id,height,width,source" };
    const modifiedResponse: any = {};

    _extend(queryObj, query);

    FB.api("/" + id + "/photos", queryObj,
      (response: any) => {
        if (response && !response.error) {
          // modify data to support the need;
          const data = response.data;
          const paging = response.paging || null;
          for (const i in data) {
            if (data.hasOwnProperty(i)) {
              modifiedResponse[data[i].id] = data[i];
            }
          }
          this.setState({
            albumsLoaded: false,
            showError: false,
            photoPaging: paging,
            showOverlay: true,
            photoDataLoaded: _extend(this.state.photoDataLoaded, modifiedResponse)
          });
        } else {
          this.showError(null);
        }
      }
    );
  }

  public itemSelector = (dataset: any) => {
    const type = dataset.type;
    const id = dataset.id;
    let imageSource;
    if (type === "album") {
      // get album id
      this.getPhotosFromAlbum(id, {});
    } else {
      imageSource = this.state.photoDataLoaded[id];
      if (imageSource) {
        if (this.props.getURL) {
          this.props.onSelection(imageSource);
          this.closeOverlay();
        } else {
          this.getURLasFileObj(imageSource.source);
        }
      }
    }
  }

  public getURLasFileObj = (url: any) => {
    const myRequest = new XMLHttpRequest();
    myRequest.open("GET", url);
    myRequest.responseType = "blob"; // force the HTTP response, response-type header to be blob
    myRequest.onload = () => {
      const blob = myRequest.response;
      const type = blob.type.split("/")[1] || "jpg";
      blob.name = "facebook_upload." + type;
      this.props.onSelection(blob);
      this.closeOverlay();
    };
    myRequest.send();
  }

  /*
  public getMoreItems = (paging: any, type: any) => {

  }
  */

  public showError = (error: any) => {
    this.setState({
      showOverlay: true,
      showError: true,
      customError: error || ErrorMessages.default
    });
  }

  public getAlbumData = () => {
    this.setState({
      albumsLoaded: true,
      photoDataLoaded: {}
    });
  }

  public render() {
    const state = this.state;
    return (
      <div className="facebookImageSelector">
        {(state.showOverlay) ?
          <ImageLoader
            data={state.albumsLoaded ? state.albumDataLoaded : state.photoDataLoaded}
            type={state.albumsLoaded}
            closeOverlay={this.closeOverlay}
            itemSelector={this.itemSelector}
            albumSelector={this.getAlbumData}
            onImageSelect={this.props.onSelection}
            isError={state.showError}
            /* loadMore={this.getMoreItems} */
            customError={state.customError}
            paging={state.albumsLoaded ? state.albumPaging : state.photoPaging}
          /> : null
        }
      </div>
    );
  }

}
