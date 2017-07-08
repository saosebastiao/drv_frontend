import * as React from 'react';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import ImageLoader from './ImageLoader';
import './FacebookImageSelector.scss';

const ErrorMessages =  {
  default: 'Some error occured while loading, Please try again after some time.',
  notLoggedin: 'You are not logged in!. Please log into Facebook and try again',
  unauthorized: 'You have not authorized this app!. Please provide the required permission (user_photos)',
  noAppId: 'No App Id specified',
  noPhoto: 'No Photos available in this album'
};

@observer
export default class FacebookImageSelector extends React.Component<any, {}> {

  constructor(props: any) {
    super(props);
    this.state = {
      albumsLoaded: true,
      showOverlay: false,
      showError: false,
      albumDataLoaded: {},
      photoDataLoaded: {},
      albumPaging: {},
      photoPaging: {},
      customError: ''
    };
  }

  componentDidMount() {
    this.getUserAlbums({});
  }

  getUserAlbums(query: any) {
    const auth: any = FB.getAuthResponse();
    const uid = auth.userID;
    let queryObj = { fields: 'id, name' };

    _.extend(queryObj, query);

    FB.api('/' + uid + '/albums', queryObj,
      (response: any) => {
        if (response && !response.error) {
          this.populateAlbums(response);
        } else {
          this.showError(null);
        }
      }
    );
  }

  populateAlbums = (response: any) => {
    const task: any = [];
    const data = response.data;

    for (let i in data) {
      if (data[i]) {
        task.push(new Promise((resolve, reject) => {
          const temp = data[i];
          const albumId = temp.id;
          FB.api('/' + albumId + '/picture', {
            type: 'album'
          }, (response: any) => {
            let res: any = {};
            if (response && !response.error) {
              /* handle the result */
              res.name = temp.name;
              res.url = response.data.url;
              res.id = temp.id;
              resolve(res);
            } else {
              reject(response.error);
            }
          })
        }));
      }
      Promise.all(task)
        .then((results) => {
          var albums: any = {};
          results.forEach((album: any) => albums[album.id] = album);
          this.setState({
            showOverlay: true,
            showError: false,
            albumDataLoaded: _.extend((this.state as any).albumDataLoaded, albums)
          });
        })
        .catch((error) => {
          console.log('populateAlbums error', error);
          this.showError(null);
        });
    }
  }

  closeOverlay = () => this.props.onCloseModal();

  getPhotosFromAlbum = (id: any, query: any) => {
    const queryObj = { fields: 'id,height,width,source' };
    const modifiedResponse: any = {};

    _.extend(queryObj, query);

    FB.api('/' + id + '/photos', queryObj,
      (response) => {
        if (response && !response.error) {
          // modify data to support the need;
          const data = response.data;
          const paging = response.paging || null;
          for (let i in data) {
            if (data.hasOwnProperty(i)) {
              modifiedResponse[data[i].id] = data[i];
            }
          }
          this.setState({
            albumsLoaded: false,
            showError: false,
            photoPaging: paging,
            showOverlay: true,
            photoDataLoaded: _.extend((this.state as any).photoDataLoaded, modifiedResponse)
          });
        } else {
          this.showError(null);
        }
      }
    );
  }

  itemSelector = (dataset: any) => {
    var type = dataset.type, id = dataset.id, imageSource;
    if (type === 'album') {
      // get album id
      this.getPhotosFromAlbum(id, {});
    } else {
      imageSource = (this.state as any).photoDataLoaded[id];
      if (imageSource) {
        if ((this.props as any).getURL) {
          (this.props as any).onSelection(imageSource);
          this.closeOverlay();
        } else {
          this.getURLasFileObj(imageSource.source);
        }
      }
    }
  }

  getURLasFileObj = (url: any) => {
    const myRequest = new XMLHttpRequest();
    myRequest.open('GET', url);
    myRequest.responseType = 'blob';//force the HTTP response, response-type header to be blob
    myRequest.onload = () => {
      const blob = myRequest.response;
      const type = blob.type.split('/')[1] || 'jpg';
      blob.name = 'facebook_upload.' + type;
      (this.props as any).onSelection(blob);
      this.closeOverlay();
    };
    myRequest.send();
  };

  getMoreItems = (paging: any, type: any) => {

  }

  showError = (error: any) => {
    this.setState({
      showOverlay: true,
      showError: true,
      customError: error || ErrorMessages['default']
    });
  }

  getAlbumData = () => {
    this.setState({
      albumsLoaded: true,
      photoDataLoaded: {}
    });
  }

  render() {
    const state: any = this.state;
    return (
      <div className='facebookImageSelector'>
        {(state.showOverlay) ?
          <ImageLoader
            data={state.albumsLoaded ? state.albumDataLoaded : state.photoDataLoaded}
            type = {state.albumsLoaded}
            closeOverlay={this.closeOverlay}
            itemSelector={this.itemSelector}
            albumSelector={this.getAlbumData}
            onImageSelect={this.props.onImageSelect}
            isError={state.showError}
            loadMore={this.getMoreItems}
            customError={state.customError}
            paging={state.albumsLoaded ? state.albumPaging : state.photoPaging} /> : ''
        }
      </div>
    );
  }
  
}