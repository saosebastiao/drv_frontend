import * as React from 'react';
import * as _ from 'lodash';
import './FacebookImageSelector.scss';

const ErrorMessages =  {
    default: 'Some error occured while loading, Please try again after some time.',
    notLoggedin: 'You are not logged in!. Please log into Facebook and try again',
    unauthorized: 'You have not authorized this app!. Please provide the required permission (user_photos)',
    noAppId: 'No App Id specified',
    noPhoto: 'No Photos available in this album'
};

export default class ImageLoader extends React.Component<any, {}> {

  constructor(props: any) {
    super(props);
    this.state = {
      showSpinner: false,
      loadMoreDataSpinner: false,
      isBorder: {},
      selectedId: null
    };
  }
  
  componentWillReceiveProps(nextProps: any) {
    this.setState({ showSpinner : false, loadMoreDataSpinner: false });
  }

  render() {
    const props: any = this.props;
    const data: any = props.data;
    const state: any = this.state,
    type = ((this.props as any).type) ? 'album' : 'photos',
    allAlbums = _.map(data, (value: any, key: any) =>  {
      var borderStyle = {};
      if (state.isBorder[key]) {
        borderStyle = { border: '2px solid #3B5998' };
      }
      return (
        <div
          className='block'
          key={type + key}
          onClick={this.albumSelector}
          onDoubleClick={this.photoSelector}
          data-type={type}
          data-id={key}
        >
          <div className='front-image' style={borderStyle}>
            <div>
              <img src={value.url || value.source} />
            </div>
          </div>
          {value.name && <div className='album-name'>{value.name}</div>}
        </div>
      );
    });

    return (
      <div className='overlay'>
        <div className='content'>
          <header className='clearfix'>
            <div className='cross' onClick={this.closeOverlay}>X</div>
            <div>Facebook photo selector</div>
          </header>
          <section>
            {(!props.type) ? <div className='heading'>
              <div className='back' onClick={this.backAlbumSelector}>Back to albums</div>
              <div>Select a nice photo</div>
            </div>
              : <div className='heading'><div>Select an album</div></div>
            }
            <div className='block-parent'>
              {(props.isError) ? <div className='block-container-error'>{props.customError}</div> :
                (allAlbums && allAlbums.length > 0) ? <div className='block-container' ref='dataNode'>{allAlbums}</div> :
                  <div className='block-container-error'>{ErrorMessages['noPhoto']}</div>
              }
              {state.showSpinner && <div className='block-container-spinner'><div className='loader'/></div>}
              {state.loadMoreDataSpinner && <div className='block-container-loadmore'><div className='loader'/></div>}
            </div>
          </section>
          <footer>
            <div onClick={this.closeOverlay}>Cancel</div>
            {!props.type && allAlbums && allAlbums.length > 0 && <div className='selector' onClick={this.okSelector}>OK</div>}
          </footer>
        </div>
        <div className='cover'/>
      </div>
    );
  }

  backAlbumSelector = (e: any) => {
    this.setState({ showSpinner: true });
    (this.props as any).albumSelector(e);
  }

  albumSelector = (e: any) => {
    const id = e.currentTarget.dataset.id;
    const border: any = {};
    if ((this.props as any).type) {
      this.selector(e);
    } else {
      border[id] = true;
      this.setState({ isBorder: border, selectedId: id });
    }
  }

  photoSelector = (e: any) => {
    if (!((this.props as any).type)) {
      this.selector(e);
    }
  }

  okSelector = () => {
    if ((this.state as any).selectedId) {
      this.setState({ showSpinner: true });
      (this.props as any).itemSelector({id : (this.state as any).selectedId, type: 'photo'});
    }
  };

  selector = (e: any) => {
    this.setState({ showSpinner: true });
    (this.props as any).itemSelector(e.currentTarget.dataset);
  }

  closeOverlay = () => {
    (this.props as any).closeOverlay();
  }

}